from selenium import webdriver
from selenium.webdriver.common.by import By
import time

driver = webdriver.Chrome(executable_path='path_to_chromedriver')

driver.get('http://your-application-url.com')

driver.set_window_size(1280, 680)

login_link = driver.find_element(By.LINK_TEXT, "Prijavi se")
login_link.click()

email_input = driver.find_element(By.ID, 'email')
password_input = driver.find_element(By.ID, 'password')

email_input.send_keys('mz@gmail.com')
password_input.send_keys('Mcz123')

login_button = driver.find_element(By.CSS_SELECTOR, '.btn-login')
login_button.click()

time.sleep(2)

create_wardrobe_link = driver.find_element(By.LINK_TEXT, "Kreiraj ormar")
create_wardrobe_link.click()

wardrobe_name_input = driver.find_element(By.ID, 'wardrobe-name')
shelves_input = driver.find_element(By.ID, 'shelves')
drawers_input = driver.find_element(By.ID, 'drawers')
hangers_input = driver.find_element(By.ID, 'hangers')

wardrobe_name_input.send_keys('Rokov ormar 2')
shelves_input.send_keys('5')
drawers_input.send_keys('4')
hangers_input.send_keys('10')

create_wardrobe_button = driver.find_element(By.CSS_SELECTOR, '.btn-create-wardrobe')
create_wardrobe_button.click()

time.sleep(2)

current_url = driver.current_url
assert 'wardrobe-details' in current_url, f"Expected URL to contain 'wardrobe-details', but got {current_url}"

driver.quit()
