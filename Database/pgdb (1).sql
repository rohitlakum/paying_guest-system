-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 01, 2023 at 05:11 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pgdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `userid` int(11) NOT NULL,
  `roomno` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pno` decimal(50,0) NOT NULL,
  `aadhar` decimal(50,0) NOT NULL,
  `bdate` date NOT NULL,
  `duration` date NOT NULL,
  `image` varchar(200) NOT NULL,
  `address` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`userid`, `roomno`, `name`, `email`, `pno`, `aadhar`, `bdate`, `duration`, `image`, `address`) VALUES
(2, 101, 'Ravi', 'ravi@gmail.com', '9586753951', '777777777777', '2023-03-01', '2023-04-01', 'review-1.jpg', 'Surendranager-363030'),
(3, 104, 'Yash', 'yash@gmail.com', '7854742444', '555555555555', '2023-02-28', '2023-03-28', 'review-6.jpg', 'Dwarka-545857'),
(4, 102, 'Jaydip', 'jaydip@gmail.com', '9586759825', '111111111111', '2023-01-19', '2023-02-04', 'review-8.jpg', 'Surat-362514'),
(5, 104, 'Gautum', 'gautum@gmail.com', '7758557444', '444444444444', '2023-01-19', '2023-02-19', 'review-2.jpg', 'Surat-142525'),
(13, 101, 'Rohit', 'rohitlakum0562@gmail.com', '4444444444', '456122355555', '2023-03-01', '2023-04-01', 'scout.jpg', 'swastik socirty');

-- --------------------------------------------------------

--
-- Table structure for table `bookingcancel`
--

CREATE TABLE `bookingcancel` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `roomid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `bdate` date NOT NULL,
  `duration` date NOT NULL,
  `approve` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookingcancel`
--

INSERT INTO `bookingcancel` (`id`, `uid`, `roomid`, `name`, `bdate`, `duration`, `approve`) VALUES
(11, 7, 104, 'Harshil', '2023-01-20', '2023-02-20', 1),
(12, 4, 102, 'Jaydip', '2023-01-18', '2023-02-18', 1),
(16, 2, 101, 'Ravi', '2023-02-28', '2023-03-31', 1);

-- --------------------------------------------------------

--
-- Table structure for table `complaint`
--

CREATE TABLE `complaint` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `message` varchar(500) NOT NULL,
  `replay` varchar(500) NOT NULL,
  `date` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `complaint`
--

INSERT INTO `complaint` (`id`, `uid`, `name`, `message`, `replay`, `date`) VALUES
(4, 4, 'Jaydip', 'About Daily Cleaning', 'done', '10-1-2023'),
(16, 2, 'Ravi', 'About water', 'Okey', '28-2-2023'),
(17, 13, 'Rohit', 'about food', 'Got it', '1-3-2023');

-- --------------------------------------------------------

--
-- Table structure for table `extraservice`
--

CREATE TABLE `extraservice` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` decimal(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `extraservice`
--

INSERT INTO `extraservice` (`id`, `title`, `description`, `price`) VALUES
(10, 'Laundry', 'In laundry service also includes wash, dry, and iron your clothes.', '1200'),
(14, 'PeRSONAL WIFI', 'WIFI', '650');

-- --------------------------------------------------------

--
-- Table structure for table `foodmenu`
--

CREATE TABLE `foodmenu` (
  `id` int(11) NOT NULL,
  `date` varchar(200) NOT NULL,
  `morning` varchar(200) NOT NULL,
  `afternoon` varchar(200) NOT NULL,
  `evening` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `foodmenu`
--

INSERT INTO `foodmenu` (`id`, `date`, `morning`, `afternoon`, `evening`) VALUES
(9, '8-3-2023', 'jalebi', 'aaalu', 'rice');

-- --------------------------------------------------------

--
-- Table structure for table `notice`
--

CREATE TABLE `notice` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `message` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `isadmin` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notice`
--

INSERT INTO `notice` (`id`, `uid`, `name`, `message`, `date`, `isadmin`) VALUES
(4, 1, 'Admin', 'Students must turn off all the electrical equipments & lights before leaving their rooms.', '11-1-2023', 1),
(33, 2, 'Ravi', 'Tomorrow i will go home for 5 day\'s', '28-2-2023', 0),
(34, 13, 'Rohit', 'i will gohome for 4 days', '1-3-2023', 0),
(35, 1, 'Admin', 'food available', '1-3-2023', 1);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `userid` int(50) NOT NULL,
  `roomid` int(50) NOT NULL,
  `uname` varchar(100) NOT NULL,
  `dop` date NOT NULL,
  `duration` date NOT NULL,
  `payment` decimal(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `userid`, `roomid`, `uname`, `dop`, `duration`, `payment`) VALUES
(12, 4, 102, 'Jaydip', '2023-01-02', '2023-01-25', '24000'),
(13, 5, 104, 'Gautum', '2023-01-19', '2023-02-19', '24000'),
(14, 7, 104, 'Harshil', '2023-01-21', '2023-02-21', '24000'),
(16, 3, 104, 'Yash', '2023-01-23', '2023-02-23', '24000'),
(26, 2, 101, 'Ravi', '2023-01-31', '2023-03-03', '14000'),
(27, 9, 107, 'Kishan', '2023-02-04', '2023-03-04', '13000'),
(36, 13, 101, 'Rohit', '2023-03-01', '2023-04-01', '28000'),
(37, 2, 101, 'Ravi', '2023-03-01', '2023-04-01', '14000');

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `id` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `pno` decimal(20,0) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `admin` tinyint(4) NOT NULL,
  `isbooked` tinyint(4) NOT NULL,
  `token` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`id`, `name`, `pno`, `email`, `password`, `admin`, `isbooked`, `token`) VALUES
(1, 'Admin', '4585444155', 'admin@gmail.com', '$2b$10$lo7DyH/M5SNJM5695d4Fy.sSufGn7RxXPFfdwG8ScEaboZN4wrX8K', 1, 1, NULL),
(2, 'Ravi', '9586753951', 'ravi@gmail.com', '$2b$10$9sIXI/uB1PCxNVo5qXfglen5.lMnjVGqRWikFNLkEXeABZEmVFAEW', 0, 1, NULL),
(3, 'Yash', '7854742444', 'yash@gmail.com', '$2b$10$H/n1eLWoAZz9am2aLChtleZgZRWx2UqT.OUv2EQAl0B/fXGOwoeam', 0, 1, NULL),
(4, 'Jaydip', '9586759825', 'jaydip@gmail.com', '$2b$10$gpJFqvlsPhZpyU2rnoRzuOY8qLUMUc3l7yXihFU/bCwTfhUzUSIpy', 0, 1, NULL),
(5, 'Gautum', '7758557444', 'gautum@gmail.com', '$2b$10$qRNZbf1J59JzC1HNIPeWGuajLJ5PeR5r6jAh1DPVSvoos08VZfiuO', 0, 1, NULL),
(6, 'Chintan', '9857544444', 'chintan@gmail.com', '$2b$10$PSROe1QL9R5HsWKuqix8pugbwuqF5ohwhbGXZmUYHUpN9kEuAB3Pi', 0, 0, NULL),
(7, 'Harshil', '9586752555', 'harshil@gmail.com', '$2b$10$F5UP3QGD3ou0EEcmWXFKkO71SrE0fkcaKXl3W9K7PleUdDVHLOKT6', 0, 0, NULL),
(9, 'Kishan', '7777755584', 'kishan@gmail.com', '$2b$10$sFNTBk1xC7hZW3wOe.WziOPNni4JHUjui6S5I1MVMeaTcblS6Ac3S', 0, 0, NULL),
(13, 'Rohit', '4444444444', 'rohitlakum0562@gmail.com', '$2b$10$7u5aitBB/Yn6jt5MWz0QkOfhJOztcUZaXyf.N2JMJHOn3ai4IbPvS', 0, 1, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzIjoiJDJiJDEwJHQxeWJFaURydzJwNXBybXJEd3NITXV1dnlmZFpxaC52TkU5clZvSjlzV0lxRWVrVHAuRTR1IiwiaWF0IjoxNjc3NjYwMjY4LCJleHAiOjE2Nzc2NjAzMjh9.-f9OI4aCuu-JQmYqwf7BaK3GSG7rqFieQo8pd6BIU34');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(200) NOT NULL,
  `message` varchar(200) NOT NULL,
  `date` varchar(200) NOT NULL,
  `image` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `review`
--

INSERT INTO `review` (`id`, `uid`, `name`, `message`, `date`, `image`) VALUES
(6, 5, 'Gautum', 'I was searching a cheap and better PG in Ahmedabad. APNA PG is a very good PG and the people (owner) are very sweet and co-operative.It is a better place to stay . I really recommended to try to stay ', '10-1-2023', 'review-2.jpg'),
(7, 2, 'Ravi', 'One of the best PG i came across. They provides the amenities such as laundry, freezer , tasty food, locker room, RO water and much more', '10-1-2023', 'review-1.jpg'),
(12, 4, 'Jaydip', 'it is one of the best pg which I have seen.it is provide good food and facilities with hygiene. regularly cleaning of rooms. friendly behaviour of staff. I like this PG.', '10-1-2023', 'review-8.jpg'),
(18, 2, 'Ravi', 'Good pg', '1-3-2023', 'review-1.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `id` int(11) NOT NULL,
  `title` varchar(500) NOT NULL,
  `description` varchar(500) NOT NULL,
  `capacity` int(50) NOT NULL,
  `vacancy` int(20) NOT NULL,
  `image` varchar(200) NOT NULL,
  `category` varchar(200) NOT NULL,
  `price` decimal(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`id`, `title`, `description`, `capacity`, `vacancy`, `image`, `category`, `price`) VALUES
(101, '101 - AC Room', 'This is two sharing ac room', 2, 0, '2 Ac.jpg', 'Ac', '14000'),
(102, '102  - AC Room', 'This is three sharing ac room', 3, 2, '3 Ac_.jpg', 'Ac', '12000'),
(103, '103 - AC Room', 'This is Four sharing ac room', 4, 0, '4 ac__.jpg', 'Ac', '8000'),
(104, '104 - Non Ac Room', 'This is two sharing non ac room', 4, 2, '2 Non-Ac.jpg', 'Non Ac', '12000'),
(105, '105 - Non Ac Room', 'This is three sharing non ac room', 3, 3, '3 Non-Ac_.jpg', 'Non Ac', '9000'),
(106, '106 - Non Ac Room', 'This is two sharing non ac room', 2, 2, '4 Non-Ac.jpg', 'Non Ac', '6500'),
(107, '107 - Non Ac Room', 'This is two sharing non ac room', 2, 2, '4 Non-Ac.jpeg', 'Non Ac', '6500'),
(108, '108 - Non Ac Room', 'This is three sharing non ac room', 3, 3, '3 Non-Ac_.jpg', 'Non Ac', '9000'),
(109, '109 - Non Ac Room', 'This is four sharing non ac room', 4, 4, '4 Non-ac...jpg', 'Non Ac', '6500'),
(110, '110 - Ac Room', 'This is two sharing ac room', 2, 2, '2  Ac--.jpg', 'Ac', '14000'),
(115, 'Ac Room', 'Ac tromm', 4, 4, '3 AC-.jpg', 'Ac', '8000');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `id` int(11) NOT NULL,
  `title` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`id`, `title`, `description`) VALUES
(8, 'High speed internet', 'Wifi service available with 80 mbps high speed.'),
(9, 'Drinking water', 'In our space we\'re having water purifiers to avail drinking water'),
(12, 'Fridge', 'We have floor wise fridges accordingly which is common for the whole floor to use'),
(13, '24 × 7 water supply', 'Regular water supply is available for 24 hours a day (but use it as needed cause water is precious)'),
(15, 'Housekeeping', 'Cleaning of rooms+kitchen+bathrroms+dining area is performed on daily basis'),
(16, 'Bed with mattress + wardrobe', 'Bed with comfy mattress and spacious Wardrobe with extra storage space is available for every guest personally'),
(20, 'Laundry', 'We\'re providing washing machine for laundry which you can use by yourself'),
(21, 'Attached washroom', 'Every room of pg is having attached washroom which remains personal for every room accordingly for the room members');

-- --------------------------------------------------------

--
-- Table structure for table `servicebuyer`
--

CREATE TABLE `servicebuyer` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `service` varchar(500) NOT NULL,
  `bdate` date NOT NULL,
  `duration` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicebuyer`
--

INSERT INTO `servicebuyer` (`id`, `uid`, `name`, `service`, `bdate`, `duration`) VALUES
(27, 4, 'Jaydip', 'Laundry', '2023-02-28', '2023-03-28'),
(28, 13, 'Rohit', 'PeRSONAL WIFI', '2023-03-01', '2023-03-31');

-- --------------------------------------------------------

--
-- Table structure for table `servicepayment`
--

CREATE TABLE `servicepayment` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(500) NOT NULL,
  `service` varchar(500) NOT NULL,
  `bdate` date NOT NULL,
  `duration` date NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `servicepayment`
--

INSERT INTO `servicepayment` (`id`, `uid`, `name`, `service`, `bdate`, `duration`, `price`) VALUES
(30, 4, 'Jaydip', 'Laundry', '2023-02-28', '2023-03-28', 1200),
(31, 13, 'Rohit', 'PeRSONAL WIFI', '2023-03-01', '2023-03-31', 650);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`userid`);

--
-- Indexes for table `bookingcancel`
--
ALTER TABLE `bookingcancel`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `extraservice`
--
ALTER TABLE `extraservice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `foodmenu`
--
ALTER TABLE `foodmenu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notice`
--
ALTER TABLE `notice`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicebuyer`
--
ALTER TABLE `servicebuyer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `servicepayment`
--
ALTER TABLE `servicepayment`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookingcancel`
--
ALTER TABLE `bookingcancel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `complaint`
--
ALTER TABLE `complaint`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `extraservice`
--
ALTER TABLE `extraservice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `foodmenu`
--
ALTER TABLE `foodmenu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `notice`
--
ALTER TABLE `notice`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `registration`
--
ALTER TABLE `registration`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `servicebuyer`
--
ALTER TABLE `servicebuyer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `servicepayment`
--
ALTER TABLE `servicepayment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
