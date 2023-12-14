DROP TABLE IF EXISTS `eatsnapDB`.`users`;
DROP TABLE IF EXISTS `eatsnapDB`.`shop_genres`;
DROP TABLE IF EXISTS `eatsnapDB`.`shops`;
DROP TABLE IF EXISTS `eatsnapDB`.`comments`;
DROP TABLE IF EXISTS `eatsnapDB`.`commentImgs`;
DROP TABLE IF EXISTS `eatsnapDB`.`stamps`;
DROP TABLE IF EXISTS `eatsnapDB`.`stamp_to_shops`;
DROP TABLE IF EXISTS `eatsnapDB`.`friends`;

-- 'users' テーブル
CREATE TABLE `eatsnapDB`.`users` (
    `user_id` VARCHAR(191) NOT NULL PRIMARY KEY,
    `user_name` VARCHAR(191) NOT NULL,
    `user_mail` VARCHAR(191) NOT NULL,
    `user_pass` VARCHAR(191) NOT NULL,
    `user_intro` VARCHAR(200),
    `user_icon` VARCHAR(191) NOT NULL DEFAULT 'default.png',
    `user_location` VARCHAR(191) NOT NULL DEFAULT '未設定'
);

-- 'shop_genres' テーブル
CREATE TABLE `eatsnapDB`.`shop_genres` (
    `genre_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `genre_name` VARCHAR(191) NOT NULL
);

-- 'shops' テーブル
CREATE TABLE `eatsnapDB`.`shops` (
    `shop_id` VARCHAR(191) NOT NULL PRIMARY KEY,
    `genre_id` INT NOT NULL,
    `shop_name` VARCHAR(191) NOT NULL,
    FOREIGN KEY (`genre_id`) REFERENCES `eatsnapDB`.`shop_genres` (`genre_id`)
);

-- 'comments' テーブル
CREATE TABLE `eatsnapDB`.`comments` (
    `comment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `score` INT NOT NULL,
    `comment_intro` VARCHAR(200) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `shop_id` VARCHAR(191) NOT NULL,
    `post_time` DATETIME NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `eatsnapDB`.`users` (`user_id`),
    FOREIGN KEY (`shop_id`) REFERENCES `eatsnapDB`.`shops` (`shop_id`)
);

-- 'commentImgs' テーブル
CREATE TABLE `eatsnapDB`.`commentImgs` (
    `comment_id` INT NOT NULL,
    `comment_detail_id` INT NOT NULL,
    `comment_img` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`comment_id`, `comment_detail_id`),
    FOREIGN KEY (`comment_id`) REFERENCES `eatsnapDB`.`comments` (`comment_id`)
);

-- 'stamps' テーブル
CREATE TABLE `eatsnapDB`.`stamps` (
    `stamp_id` INT NOT NULL PRIMARY KEY,
    `stamp_img` VARCHAR(191) NOT NULL
);

-- 'stamp_to_shops' テーブル
CREATE TABLE `eatsnapDB`.`stamp_to_shops` (
    `user_id` VARCHAR(191) NOT NULL,
    `shop_id` VARCHAR(191) NOT NULL,
    `stamp_to_shop_detail_id` INT NOT NULL,
    `stamp_id` INT NOT NULL,
    `delete_flag` INT NOT NULL DEFAULT 0,
    PRIMARY KEY (`user_id`, `shop_id`, `stamp_to_shop_detail_id`),
    FOREIGN KEY (`user_id`) REFERENCES `eatsnapDB`.`users` (`user_id`),
    FOREIGN KEY (`shop_id`) REFERENCES `eatsnapDB`.`shops` (`shop_id`),
    FOREIGN KEY (`stamp_id`) REFERENCES `eatsnapDB`.`stamps` (`stamp_id`)
);

-- 'friends' テーブル
CREATE TABLE `eatsnapDB`.`friends` (
    `user1_id` VARCHAR(191) NOT NULL,
    `user2_id` VARCHAR(191) NOT NULL,
    PRIMARY KEY (`user1_id`, `user2_id`),
    FOREIGN KEY (`user1_id`) REFERENCES `eatsnapDB`.`users` (`user_id`),
    FOREIGN KEY (`user2_id`) REFERENCES `eatsnapDB`.`users` (`user_id`)
);
