FROM debian:latest

# Persist bash history between runs
RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && echo $SNIPPET >> "/root/.bashrc"

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# update the repository sources list
# and install dependencies
RUN apt-get update \
    && apt-get install -y curl \
    && apt-get -y autoclean

# update the repository sources list
# and install Python 3.8
# https://linuxize.com/post/how-to-install-python-3-8-on-debian-10/
# RUN apt update \
#     && apt install build-essential zlib1g-dev libncurses5-dev libgdbm-dev libnss3-dev libssl-dev libsqlite3-dev libreadline-dev libffi-dev curl libbz2-dev \
#     && cd ~ \
#     && curl -O https://www.python.org/ftp/python/3.8.2/Python-3.8.2.tar.xz \
#     && tar -xf Python-3.8.2.tar.xz \
#     && cd Python-3.8.2 \
#     && ./configure --enable-optimizations \
#     && make -j 4 \
#     && make altinstall

# nvm environment variables
ENV NVM_DIR /usr/local/nvm
ENV NODE_VERSION 14.15.4

# install nvm
# https://github.com/creationix/nvm#install-script
RUN curl --silent -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.2/install.sh | bash

# install node and npm
RUN source $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

# add node and npm to path so the commands are available
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

# Install Git and setup SITK local Git account
RUN apt-get -y install git \
    && source ~/.bashrc \
    && git config --global user.name "Sharing Is The Key" \
    && git config --global user.email "sitknewnormal@gmail.com"

# Install Gatsby CLI
RUN npm install -g gatsby-cli

# A Gatsby source plugin for sourcing data into your Gatsby application from your local filesystem.
RUN npm install gatsby-source-filesystem

# Exposes several image processing functions built on the Sharp image processing library
RUN npm install gatsby-plugin-sharp 

# Provides drop-in support for server rendering data added with React Helmet.
RUN npm install gatsby-plugin-react-helmet

# This reusable React component will manage all of your changes to the document head.
RUN npm install react-helmet

# A Gatsby plugin to handle cdn, base64 and self hosted webfonts
RUN npm install gatsby-plugin-webfonts

# Create a sitemap for your Gatsby site.
RUN npm install gatsby-plugin-sitemap

# Source plugin for pulling documents into Gatsby from a Strapi API.
RUN npm install gatsby-source-strapi

# Creates ImageSharp nodes from image types that are supported by the Sharp image processing library and provides fields in their GraphQL types for processing your images in a variety of ways including resizing, cropping, and creating responsive images.
RUN npm install gatsby-transformer-sharp