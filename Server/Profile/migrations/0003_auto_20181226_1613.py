# Generated by Django 2.1.4 on 2018-12-26 08:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0002_remove_profile_wxopenid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='wxIcon',
            field=models.CharField(help_text='wx头像路径', max_length=500),
        ),
    ]