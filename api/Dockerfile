FROM python:3.11-alpine

RUN pip install --upgrade pip

# Install packegs

RUN apk add libpq-dev gcc

WORKDIR /usr/src/app/

# requirements

COPY . .

RUN pip install -r requirements.txt

# Setup

RUN cd main && python setup.py

# Ports and run

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]