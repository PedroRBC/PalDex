FROM node:24-slim

WORKDIR /usr/src/app

# Install Bun
# https://bun.sh/docs/installation
RUN npm install -g bun

# Necessary for Gpg Sign in Devcontainer
RUN apt-get update && apt-get install --no-install-recommends -y \
    git gpg gnupg gpg-agent socat
   
CMD ["tail", "-f", "/dev/null"]