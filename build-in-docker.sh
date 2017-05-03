#!/usr/bin/env bash

docker run --rm -v `pwd`:/Chat -u `stat -c "%u:%g" build.gradle` java:8-jdk /bin/bash -c "cd /Chat && ./gradlew clean test bootRepackage"
