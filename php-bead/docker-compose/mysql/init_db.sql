DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
INSERT INTO `users` (id, username, email, password, isAdmin) VALUES
  (1, 'admin', 'admin@winampify.com', '$2y$12$zNp8fDu10ZLAmutsdrDtGOVAN9b30owX1SAz3LE24wa5AwG4TVc02', 1), -- pass: admin
  (12, 'johndoe', 'john.doe@example.com', '$2y$12$X/k0UTvWsgrkoSqROurI7unIwdfa7tBgc4tgK12qbzrKMH/siAnSG', 1), -- pass: password123
  (13, 'janesmith', 'jane.smith@example.com', '$2y$12$xbYF0i.gvhd0Zjx8E7z54.j/Wyr5mJ6uTp0Of3jJScexn4rdRrXFm', 0); -- pass: secret456

DROP TABLE IF EXISTS `tracks`;
CREATE TABLE `tracks` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `artist` VARCHAR(255) NOT NULL,
  `length` TIME,
  `year` INT,
  `genres` JSON,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
INSERT INTO tracks (id, title, artist, length, year, genres) VALUES
  (12, 'Bohemian Rhapsody', 'Queen', '00:05:55', 1975, '["Rock", "Classic", "Progressive"]'),
  (13, 'Thriller', 'Michael Jackson', '00:05:57', 1982, '["Pop"]'),
  (14, 'Hotel California', 'Eagles', '00:06:30', 1976, '["Rock"]'),
  (15, 'Hey Jude', 'The Beatles', '00:07:11', 1968, '["Rock"]'),
  (16, 'Billie Jean', 'Michael Jackson', '00:04:54', 1982, '["Pop"]');

DROP TABLE IF EXISTS `playlists`;
CREATE TABLE playlists (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `isPublic` BOOLEAN NOT NULL DEFAULT 0,
  `createdBy` bigint(20) unsigned,
  `tracks` JSON,
  PRIMARY KEY (`id`),
  FOREIGN KEY (createdBy) REFERENCES users(id)
) ENGINE = InnoDB AUTO_INCREMENT = 12 DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
INSERT INTO `playlists` (id, name, isPublic, createdBy, tracks) VALUES
  (12, 'My Favorites', 1, 12, '[12, 14, 16]'),
  (13, 'Rock Classics', 1, 13, '[13, 15]'),
  (14, 'Throwback Jams', 0, 12, '[12, 13, 14]');

