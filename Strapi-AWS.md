# SITK - Strapi on AWS

## Installing AWS command line tools
Follow the instructions [here](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-linux.html) to install AWS CLI.

## Setting up AWS environment
```
aws configure
```
Copy and paste your **AWS Access Key ID** and **AWS Secret Access Key** and **Default Region Name**

## Install eksctl, kubectl, and aws-iam-authenticator
Download the proper `eksctl` for the distro into /tmp directory
```
curl --silent --location "https://github.com/weaveworks/eksctl/releases/download/latest_release/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
```
Moving `eksctl` to an appropriate directory which is already in the path.
```
sudo mv /tmp/eksctl /usr/local/bin
```
Testing to see if it works
```
eksctl version
```
Download the `kubectl` client
```
curl -o kubectl https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/kubectl
```
Confirm if it's there 
```
ls
```
### Checking `kubectl` archive hash key
First, let's download the SHA256 key
```
curl -o kubectl.sha256 https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/kubectl.sha256
``` 
Confirm if it's there 
```
ls
cat kubectl.sha256
```
Run hash calculation against the file we've just downloaded and compare the 2 two hashes
```
openssl sha1 -sha256 kubectl
```
Making `kubectl` file executable 
```
chmod +x ./kubectl
```
Creating a bin direcotory in my home directory
```
mkdir bin
```
Copying kubectl into bin directory we've just created 
```
cp kubectl bin
```
Making this bun directory into system path
```
export PATH=$HOME/bin:$PATH
```
Adding the path to `./bashrc` file to make it permanent
```
echo 'export PATH=$HOME/bin:$PATH' >> ~/.bashrc
```
Let's test if it is ok
```
kubectl version --short --client
```
Download `aws-iam-authenticator` and repeat the same process we've just did with `kubectl`
```
curl -o aws-iam-authenticator https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/aws-iam-authenticator 

ls

curl -o aws-iam-authenticator.sha256 https://amazon-eks.s3-us-west-2.amazonaws.com/1.12.7/2019-03-27/bin/linux/amd64/aws-iam-authenticator.sha256

ls

cat aws-iam-authenticator.sha256

openssl sha1 -sha256 aws-iam-authenticator

chmod +x ./aws-iam-authenticator

cp aws-iam-authenticator bin/

aws-iam-authenticator help
```
This is the expected output
```
A tool to authenticate to Kubernetes using AWS IAM credentials

Usage:
  aws-iam-authenticator [command]

Available Commands:
  help        Help about any command
  init        Pre-generate certificate, private key, and kubeconfig files for the server.
  server      Run a webhook validation server suitable that validates tokens using AWS IAM
  token       Authenticate using AWS IAM and get token for Kubernetes
  verify      Verify a token for debugging purpose
  version     Version will output the current build information

Flags:
  -i, --cluster-id ID       Specify the cluster ID, a unique-per-cluster identifier for your aws-iam-authenticator installation.
  -c, --config filename     Load configuration from filename
  -h, --help                help for aws-iam-authenticator
  -l, --log-format string   Specify log format to use when logging to stderr [text or json] (default "text")

Use "aws-iam-authenticator [command] --help" for more information about a command.
```

## Setting up SITK Strapi using Amazon Elastic Kubernetes Service (EKS)

Checking any existing EKS Cluster in my current region
```
eksctl get cluster
```
If there is more than on cluster, use the command below to get the contexts and set the correct one
```
kubectl config get-contexts
kubectl config current-context
kubectl config use-context <my-cluster-name>
```
Set the context to **my-cluster-name** or create a new one.

Create SITK Strapi Cluster with 3 eligible free tier nodes, scaling from min 1 to max 3 nodes.

```
eksctl create cluster \
  --name sitk-strapi-cluster \
  --version 1.18 \
  --nodegroup-name standard-workers \
  --node-type t2.micro \
  --nodes 2 \
  --nodes-min 1 \
  --nodes-max 3 \
  --node-ami auto
```
## Creating a Name Space for the Strapi Project
Let's create `sitkstrapi` directory to store deployment files.
```
mkdir sitkstrapi
```
Create the Name Space deployment file `namespace-deployment.yaml` for Kubernetes with the content below and save it into `sitkstrapi` directory

```
apiVersion: v1
kind: Namespace
metadata:
  name: sitkstrapi
```
## Creating secrets for SITK Strapi
Use the command below to create a secret to MongoDB password.
```
kubectl create secret generic mongodb-pass --from-literal=password=sitkstrapi --namespace=sitkstrapi
```

Use the command below to create a secret to MongoDB user.
```
kubectl create secret generic mongodb-usr --from-literal=user=sitkstrapi --namespace=sitkstrapi
```

Create the MongoDB deployment file `mongodb-deployment.yaml` for Kubernetes with the content below and save it into `sitkstrapi` directory
```
apiVersion: v1
kind: Service
metadata:
  name: strapi-mongodb
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  ports:
    - port: 27017
  selector:
    app: strapi
    tier: mongodb
  clusterIP: None
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: mongodb-pv-claim
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strapi-mongodb
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  selector:
    matchLabels:
      app: strapi
      tier: mongodb
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: strapi
        tier: mongodb
    spec:
      containers:
      - image: mongo
        name: mongo
        env:
        - name: MONGO_INITDB_ROOT_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-pass
              key: password
        - name: MONGO_INITDB_ROOT_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-usr
              key: user
        ports:
        - containerPort: 27017
          name: mongo
        volumeMounts:
        - name: mongo-persistent-storage
          mountPath: /data/db
      volumes:
      - name: mongo-persistent-storage
        persistentVolumeClaim:
          claimName: mongodb-pv-claim
```

Create the SITK Strapi deployment file `strapi-deployment.yaml` for Kubernetes with the content below

```
apiVersion: v1
kind: Service
metadata:
  name: strapi
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  ports:
    - port: 1337
  selector:
    app: strapi
    tier: frontend
  type: LoadBalancer
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: strapi-pv-claim
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 5Gi
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: strapi
  namespace: sitkstrapi
  labels:
    app: strapi
spec:
  selector:
    matchLabels:
      app: strapi
      tier: frontend
  strategy:
    type: Recreate
  template:
    metadata:
      labels:
        app: strapi
        tier: frontend
    spec:
      containers:
      - image: strapi/strapi
        name: strapi
        env:
        - name: HOST
          value: "0.0.0.0"
        - name: DATABASE_CLIENT
          value: "mongo"
        - name: DATABASE_NAME
          value: "strapi"
        - name: DATABASE_HOST
          value: "strapi-mongodb"
        - name: DATABASE_PORT
          value: "27017"
        - name: DATABASE_USERNAME
          valueFrom:
            secretKeyRef:
              name: mongodb-pass
              key: password
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: mongodb-usr
              key: user
        ports:
        - containerPort: 1337
          name: strapi
        volumeMounts:
        - name: strapi-persistent-storage
          mountPath: /srv/app
      volumes:
      - name: strapi-persistent-storage
        persistentVolumeClaim:
          claimName: strapi-pv-claim
```

Create MongoDB application with the command below

```
kubectl create -f mongodb-deployment.yaml --namespace=sitkstrapi
```

Check if the MongoDB `PersistentVolumeClaim` was created and with status **Bound**

```
kubectl get pvc --namespace=sitkstrapi
```
Check if the MongoDB pod was created

```
kubectl get pods --namespace=sitkstrapi
```

Check if the MongoDB service was created

```
kubectl get services --namespace=sitkstrapi
```

Create Strapi application with the command below

```
kubectl create -f strapi-deployment.yaml --namespace=sitkstrapi
```

Check if the Strapi `PersistentVolumeClaim` was created and with status **Bound**

```
kubectl get pvc --namespace=sitkstrapi
```
Check if the Strapi pod was created

```
kubectl get pods --namespace=sitkstrapi
```

Check if the Strapi service was created

```
kubectl get services --namespace=sitkstrapi -o wide
```

## Troubleshooting
Checking Kubernetes pods logs 
```
 kubectl logs <pod name> -f --namespace=sitkstrapi
```

Describing Kubernetes pods for more container info
```
 kubectl describe pod <pod name> -f --namespace=sitkstrapi
```

Jumping into Kubernetes pods
```
 kubectl exec -it <pod name> /bin/bash --namespace=sitkstrapi
```

Deleting MongoDB application with the command below

```
kubectl delete -f mongodb-deployment.yaml --namespace=sitkstrapi
```
Deleting Strapi application with the command below

```
kubectl delete -f strapi-deployment.yaml --namespace=sitkstrapi
```
