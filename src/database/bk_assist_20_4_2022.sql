-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th4 20, 2022 lúc 06:34 PM
-- Phiên bản máy phục vụ: 10.4.21-MariaDB
-- Phiên bản PHP: 7.3.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `bk_assist`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account`
--

CREATE TABLE `account` (
  `id` varchar(255) NOT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `create_time` datetime DEFAULT NULL,
  `avatar` varchar(255) NOT NULL,
  `role` char(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account`
--

INSERT INTO `account` (`id`, `last_name`, `first_name`, `date_of_birth`, `phone_number`, `password`, `create_time`, `avatar`, `role`) VALUES
('7c15ce80-ac39-11ec-a902-bdbcf9ee7b0d', 'Ý', 'Lê Thị', NULL, '123456789', '$2b$10$IXET3Qu8EBYcrN.YlcAzzOVbzT4uY4l9XTSED7TVSqmNF07kojPm.', '2022-03-25 19:45:43', 'avatar-default.jpg', 'C'),
('8febf910-ac3a-11ec-a4aa-57a026413c54', 'Nguyễn Văn', 'A', NULL, '12345', '$2b$10$iSOUmfDw3fZUfzyrV6ycDuV5Npf.N12i.TDPDVJOXrNkfz3W0uSAq', '2022-03-25 19:53:26', 'avatar-default.jpg', 'C'),
('a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Lê Thị Như', 'Ý', '2001-12-09', '0936010094', '$2b$10$ckO9GLPczh1/BvkuAvigqeKI45zd1Fbi4flYXz9wMHtkCq3eFAkt2', '2021-11-18 11:11:42', 'Mobile-bro (3).png', 'C');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `account_address`
--

CREATE TABLE `account_address` (
  `account_id` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `account_address`
--

INSERT INTO `account_address` (`account_id`, `address`) VALUES
('a2a142f0-4825-11ec-a190-53e797f7b5e3', '245, đường Đinh Tiên Hoàng, Phường 03, Quận 8, Thành phố Hồ Chí Minh');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `administrator`
--

CREATE TABLE `administrator` (
  `email` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `create_time` datetime DEFAULT NULL,
  `customer_id` varchar(255) NOT NULL,
  `device_name` varchar(255) DEFAULT NULL,
  `is_public` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `devices`
--

INSERT INTO `devices` (`id`, `create_time`, `customer_id`, `device_name`, `is_public`) VALUES
(1, '2022-03-17 06:44:58', 'a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Light', 1),
(2, '2022-03-17 07:02:21', 'a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Temperature', 1),
(3, '2022-03-17 07:02:21', 'a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Infrared', 0),
(4, '2022-03-17 07:03:21', 'a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Gas', 1),
(5, '2022-03-17 07:52:31', 'a2a142f0-4825-11ec-a190-53e797f7b5e3', 'Humidity', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `devices_detail`
--

CREATE TABLE `devices_detail` (
  `id` int(11) NOT NULL,
  `device_id` int(11) DEFAULT NULL,
  `feed_info` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `devices_detail`
--

INSERT INTO `devices_detail` (`id`, `device_id`, `feed_info`) VALUES
(1, 1, 'https://io.adafruit.com/api/v2/doancnpm/feeds/light/data'),
(2, 2, 'https://io.adafruit.com/api/v2/doancnpm/feeds/temperature/data'),
(3, 3, 'https://io.adafruit.com/api/v2/doancnpm/feeds/humidity/data'),
(4, 4, 'https://io.adafruit.com/api/v2/doancnpm/feeds/infrared/data'),
(5, 5, 'https://io.adafruit.com/api/v2/doancnpm/feeds/gas/data');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `feedbacks`
--

CREATE TABLE `feedbacks` (
  `id` int(5) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `account_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `feedbacks`
--

INSERT INTO `feedbacks` (`id`, `content`, `account_id`) VALUES
(4, 'Test gửi góp ý', 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(5, 'Test gửi góp ý 2', 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(6, NULL, 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(7, NULL, 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(8, 'Test gửi góp ý 3', 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(9, 'Test gửi góp ý 4', 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(10, 'Test gửi góp ý 5', 'a2a142f0-4825-11ec-a190-53e797f7b5e3'),
(11, 'Test gửi góp ý 6', 'a2a142f0-4825-11ec-a190-53e797f7b5e3');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `email` varchar(255) DEFAULT NULL,
  `account_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`email`, `account_id`) VALUES
('imyour2603@gmail.com', '172b4490-9f7e-11ec-b2d7-c3d9685f9e6b'),
(NULL, '7c15ce80-ac39-11ec-a902-bdbcf9ee7b0d'),
(NULL, '8febf910-ac3a-11ec-a4aa-57a026413c54');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `account`
--
ALTER TABLE `account`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `account_address`
--
ALTER TABLE `account_address`
  ADD PRIMARY KEY (`account_id`,`address`);

--
-- Chỉ mục cho bảng `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`account_id`);

--
-- Chỉ mục cho bảng `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `devices_detail`
--
ALTER TABLE `devices_detail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `device_id` (`device_id`);

--
-- Chỉ mục cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`account_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `devices_detail`
--
ALTER TABLE `devices_detail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `account_address`
--
ALTER TABLE `account_address`
  ADD CONSTRAINT `account_address_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `administrator`
--
ALTER TABLE `administrator`
  ADD CONSTRAINT `administrator_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Các ràng buộc cho bảng `devices_detail`
--
ALTER TABLE `devices_detail`
  ADD CONSTRAINT `devices_detail_ibfk_1` FOREIGN KEY (`device_id`) REFERENCES `devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
