# Generated by Django 3.2.16 on 2023-01-09 20:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20221218_2347'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='created',
            field=models.DateTimeField(default="2021-01-13 07:25:17", editable=False),
            preserve_default=False,
        ),
    ]
