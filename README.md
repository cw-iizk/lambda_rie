# lambda_rie

## 環境構築

```
$ cd Projects/lambda-rie
$ docker build -t lambda-nodejs:latest .
$ docker run -p 9000:8080 lambda-nodejs:latest
```

## テスト実行

```
$ curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d @payload.json
```

時間を計測する場合
```
time curl -XPOST "http://localhost:9000/2015-03-31/functions/function/invocations" -d @payload.json
```
