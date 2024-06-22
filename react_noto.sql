-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2023 at 02:28 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `react_noto`
--

-- --------------------------------------------------------

--
-- Table structure for table `notes`
--

CREATE TABLE `notes` (
  `note_id` varchar(8) NOT NULL,
  `note` longtext NOT NULL,
  `note_date` datetime NOT NULL,
  `user_id` int(8) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notes`
--

INSERT INTO `notes` (`note_id`, `note`, `note_date`, `user_id`) VALUES
('0OTXuZVV', '<h1>Lorem ipsum</h1><p class=\"ql-align-justify\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sodales tortor eros, eget dapibus neque euismod in. Mauris id sagittis lacus. Nulla hendrerit pharetra luctus. Pellentesque tempus massa sit amet augue scelerisque aliquet. Nulla velit ante, iaculis interdum ornare non, vulputate vitae libero. Vestibulum interdum, mauris ac porttitor consequat, quam ex ultricies enim, id viverra turpis magna a elit. Duis pharetra blandit maximus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisl dui, pellentesque non commodo ut, ullamcorper ut ipsum. In dolor urna, tincidunt sit amet dolor vitae, pretium dictum est. Phasellus sollicitudin turpis ut libero congue convallis. In hac habitasse platea dictumst. Nulla tincidunt et mauris ac sollicitudin. Maecenas ultricies quis nibh id commodo. Duis congue elementum vehicula.</p><p class=\"ql-align-justify\">Donec sed nulla vitae arcu fermentum dictum at et orci. Suspendisse vehicula augue quis metus pretium egestas. Aenean a tellus bibendum, vulputate sapien eu, ultricies felis. Aenean lacinia massa non nisl pellentesque, id efficitur ligula faucibus. In finibus nisi sit amet lectus luctus, at vulputate dui elementum. Aliquam euismod dui nec egestas malesuada. Etiam eu erat libero. Donec molestie vulputate enim, quis iaculis massa lobortis sed. In lacinia orci ante, et cursus leo gravida vitae. Nunc condimentum, turpis ac rutrum eleifend, ipsum lorem egestas sapien, at auctor lacus elit quis nibh. Curabitur lacus sem, lobortis id est nec, vulputate aliquet ligula. In condimentum lectus et sodales laoreet.</p><p class=\"ql-align-justify\">Nunc ornare blandit ipsum, et gravida quam dignissim sed. Donec nec lorem viverra, tempus libero nec, consectetur elit. Nunc sollicitudin nunc quis dapibus scelerisque. Sed egestas lacinia ante, at consectetur mi vehicula ac. Nulla facilisi. In vitae ante non diam ullamcorper tempus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse quam augue, fringilla vel placerat non, mollis a erat. Praesent tristique sit amet quam at maximus. Suspendisse eget fermentum lectus. Mauris venenatis, sapien at mollis porta, tellus turpis cursus mauris, id viverra eros purus eget nulla. Nulla in nulla accumsan leo facilisis venenatis a id eros. Nunc ultrices erat vel ex elementum volutpat. Vivamus lacinia elit et nibh tincidunt molestie et volutpat dui.</p><p class=\"ql-align-justify\">Nam placerat vel felis a varius. Donec ipsum orci, fringilla vitae pulvinar id, facilisis ac velit. Curabitur lectus augue, consectetur ut lacus id, rhoncus egestas erat. Nullam in varius mauris. Vestibulum ac sem vestibulum, consectetur lorem quis, congue erat. Etiam vitae lorem mattis, lobortis eros viverra, auctor elit. Donec sollicitudin aliquam congue. Praesent iaculis fermentum venenatis. Vestibulum ultrices semper purus non vestibulum.</p><p class=\"ql-align-justify\">Nunc ornare turpis ut sapien dictum, at rhoncus leo faucibus. Nulla et nulla efficitur, accumsan dui eget, malesuada turpis. Integer iaculis est et urna cursus, ac molestie massa ornare. Pellentesque interdum sed sapien sed sodales. Ut dictum, massa quis porta pharetra, arcu libero ornare augue, in facilisis ipsum urna sit amet erat. Integer nec consectetur mauris. Vivamus a nisi ornare, blandit sem sed, eleifend massa. Vivamus pretium quam tortor, eget scelerisque dolor eleifend id. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam ac convallis enim. Aenean rhoncus enim ac odio bibendum aliquam. In laoreet nunc eget blandit bibendum.</p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><br></p><p class=\"ql-align-justify\"><br></p><h1><br></h1>', '2023-12-15 17:10:58', NULL),
('CvZgfgUS', '<p><img src=\"data:image/png;base64,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\"></p><p>fiiine</p>', '2023-12-16 09:18:47', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(8) NOT NULL,
  `user_name` varchar(32) NOT NULL,
  `user_email` varchar(32) NOT NULL,
  `user_pass` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `notes`
--
ALTER TABLE `notes`
  ADD PRIMARY KEY (`note_id`),
  ADD KEY `fk_user` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notes`
--
ALTER TABLE `notes`
  ADD CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
