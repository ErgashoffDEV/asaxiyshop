# Generated by Django 3.1.1 on 2021-12-08 14:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('product', '0005_auto_20211208_1429'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='review',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='product.review'),
        ),
    ]
