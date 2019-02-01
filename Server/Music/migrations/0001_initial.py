# Generated by Django 2.1.4 on 2018-12-26 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Song',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(help_text='歌曲名字', max_length=50)),
                ('songer', models.CharField(help_text='歌手 名字', max_length=50)),
                ('icon', models.ImageField(null=True, upload_to='song_icon')),
                ('url', models.FileField(null=True, upload_to='song_url')),
            ],
        ),
    ]
