# Generated by Django 3.1.1 on 2021-12-06 19:06

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_orderproduct_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='orderproduct',
            old_name='price',
            new_name='total',
        ),
    ]