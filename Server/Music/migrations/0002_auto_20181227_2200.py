# Generated by Django 2.1.4 on 2018-12-27 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Music', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='songer',
            field=models.CharField(help_text='歌手名字', max_length=50),
        ),
    ]
