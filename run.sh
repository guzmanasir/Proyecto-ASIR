#!/bin/bash

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash

nvm 6.10

echo "El servidor esta en el puerto 3000"

node bin/www
