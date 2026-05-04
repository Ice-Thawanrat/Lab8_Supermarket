-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 04, 2026 at 06:26 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `supermarket_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `category`, `price`, `stock`, `image`, `create_at`) VALUES
(3, 'Orange', 'Fruit', 25.00, 1000, '1777907466403-orange.jpg', '2026-05-04 15:11:06'),
(4, 'Apple', 'Fruit', 35.00, 500, '1777907538347-apple.jpg', '2026-05-04 15:12:18'),
(5, 'Mango', 'Fruit', 40.00, 500, '1777907570691-mango.jpg', '2026-05-04 15:12:50'),
(6, 'Watermelon', 'Fruit', 30.00, 150, '1777907649894-watermelon.jpg', '2026-05-04 15:14:09'),
(7, 'Banana', 'Fruit', 50.00, 300, '1777907781684-banana.jpg', '2026-05-04 15:16:21'),
(8, 'Cheese', 'Dairy', 49.00, 80, '1777908934614-Cheese.jpg', '2026-05-04 15:35:34'),
(9, 'Milk', 'Dairy', 125.00, 150, '1777908990839-Milk.jpg', '2026-05-04 15:36:02'),
(10, 'Pork', 'Fresh Food', 180.00, 100, '1777909057408-Pork.jpg', '2026-05-04 15:37:37'),
(11, 'Eggs', 'Fresh Food', 150.00, 500, '1777909107431-Eggs.jpg', '2026-05-04 15:38:27'),
(13, 'Cookies', 'Snack', 40.00, 100, '1777909211517-Cookies.jpg', '2026-05-04 15:40:11'),
(14, 'Shampoo', 'Household', 129.00, 200, '1777909266129-Shampoo.jpg', '2026-05-04 15:41:06'),
(15, 'Soap', 'Household', 85.00, 200, '1777909327945-Soap.jpg', '2026-05-04 15:42:07'),
(16, 'Tissue Paper', 'Household', 55.00, 90, '1777909365834-Tissue Paper.jpg', '2026-05-04 15:42:45'),
(17, 'Toothpaste', 'Household', 79.00, 200, '1777909399547-Toothpaste.jpg', '2026-05-04 15:43:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
