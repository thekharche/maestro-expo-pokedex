#!/usr/bin/env bash

# Check if the environment is local
if [ "$ENV_TYPE" = "local" ]; then
    echo "this is local environment"
    exit 0
fi

# If not local, continue with the provided script
set -eox pipefail

curl -Ls "https://get.maestro.mobile.dev" | bash
export PATH="$PATH":"$HOME/.maestro/bin"

if [ "$EAS_BUILD_PLATFORM" = "ios" ]; then
   APP_EXECUTABLE_PATH=/Users/expo/workingdir/build/ios/build/Build/Products/Release-iphonesimulator/maestroexpopokedex.app
   brew install java
   echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc
   sudo ln -sfn /opt/homebrew/opt/openjdk/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk.jdk
   export CPPFLAGS="-I/opt/homebrew/opt/openjdk/include"
   maestro cloud -e APP_ID=com.thekharche.maestroexpopokedex --api-key=$MAESTRO_API_KEY --app-file=$APP_EXECUTABLE_PATH --flows=.maestro/

else
   APP_EXECUTABLE_PATH=/home/expo/workingdir/build/android/app/build/outputs/apk/release/app-release.apk
   maestro cloud -e APP_ID=com.thekharche.maestroexpopokedex --api-key=$MAESTRO_API_KEY --app-file=$APP_EXECUTABLE_PATH --flows=.maestro/
fi
