FROM apache/hadoop:3.4.1

RUN apt-get update \
    && apt-get install -y --no-install-recommends python3 python3-minimal \
    && rm -rf /var/lib/apt/lists/*

ENV HADOOP_HOME=/usr/local/hadoop
ENV PATH="${HADOOP_HOME}/bin:${PATH}"

RUN python3 --version
