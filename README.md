-- start the api
cd nasa_back
pip install django
pip install djangorestframework
pip install django-cors-headers
python manage.py runserver

-- run frontend
cd frontend
cd nasa
npm i
npm run dev
