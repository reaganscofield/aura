build:
	@sudo docker-compose build
migrations:
	@sudo docker-compose run web python manage.py makemigrations
migrate:
	@sudo docker-compose run web python manage.py migrate
run:
	@sudo docker-compose up
shell:
	@sudo docker-compose run web python manage.py shell
test:
	@sudo docker-compose run web python manage.py test 
nodemigrate:
	@sudo docker-compose run nodejs_aura_api npx sequelize db:migrate