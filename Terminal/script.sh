#!/bin/bash
read -p "Введите ваше имя:" username
mkdir "$username"
echo "привет, $username! Это твоя первая папка." > "#username/welcome.txt"
echo "Well done"

