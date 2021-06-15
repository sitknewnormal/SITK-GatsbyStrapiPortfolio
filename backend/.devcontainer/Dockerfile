FROM strapi/strapi

# # Persist bash history between runs
# RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/root/.bash_history" \
#     && echo $SNIPPET >> "/root/.bashrc"

RUN SNIPPET="export PROMPT_COMMAND='history -a' && export HISTFILE=/commandhistory/.bash_history" \
    && mkdir /commandhistory \
    && touch /commandhistory/.bash_history \
    && echo $SNIPPET >> "/root/.bashrc"

# replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

# Install Git and setup SITK local Git account
RUN apt-get -y install git \
    && source ~/.bashrc \
    && git config --global user.name "Sharing Is The Key" \
    && git config --global user.email "sitknewnormal@gmail.com"
