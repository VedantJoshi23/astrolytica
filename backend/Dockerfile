FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY app ./app
COPY ../ml /ml
COPY ../data_pipeline /data_pipeline

ENV PYTHONPATH="/app:/ml:/data_pipeline:${PYTHONPATH}"

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
