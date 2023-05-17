FROM python:3

ENV ENABLE_CORS=true

WORKDIR /usr/src/app

RUN pip install --no-cache-dir mysql-connector-python flask bcrypt

COPY . .

EXPOSE 5000

CMD ["python", "./app.py"]