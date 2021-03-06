-- MySQL Script generated by MySQL Workbench
-- Tue Apr 27 22:08:14 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema datvexekhach
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema datvexekhach
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `datvexekhach` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `datvexekhach` ;

-- -----------------------------------------------------
-- Table `datvexekhach`.`busStation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`busStation` (
  `BName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`BName`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`route`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`route` (
  `routeNum` INT NOT NULL,
  `from` VARCHAR(50) NULL,
  `dropOffPoint` VARCHAR(45) NULL,
  `Bus_Station_BName` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`routeNum`, `Bus_Station_BName`),
  INDEX `fk_ROUTE_BUS STATION_idx` (`Bus_Station_BName` ASC) VISIBLE,
  CONSTRAINT `fk_ROUTE_BUS STATION`
    FOREIGN KEY (`Bus_Station_BName`)
    REFERENCES `datvexekhach`.`busStation` (`BName`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`trip`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`trip` (
  `tripNo` INT NOT NULL,
  `Time` DATETIME NOT NULL,
  `numOfSeat` INT NOT NULL,
  `tripName` VARCHAR(45) NULL,
  `routeNum` INT NOT NULL,
  PRIMARY KEY (`tripNo`, `routeNum`),
  INDEX `fk_TRIP_ROUTE1_idx` (`routeNum` ASC) VISIBLE,
  CONSTRAINT `fk_TRIP_ROUTE1`
    FOREIGN KEY (`routeNum`)
    REFERENCES `datvexekhach`.`route` (`routeNum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`coach`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`coach` (
  `licensePlates` VARCHAR(20) NOT NULL,
  `coachName` VARCHAR(45) NOT NULL,
  `tripNo` INT NOT NULL,
  PRIMARY KEY (`licensePlates`, `tripNo`),
  INDEX `fk_COACH_TRIP1_idx` (`tripNo` ASC) VISIBLE,
  CONSTRAINT `fk_COACH_TRIP1`
    FOREIGN KEY (`tripNo`)
    REFERENCES `datvexekhach`.`trip` (`tripNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`ticket`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`ticket` (
  `tichketNo` INT NOT NULL,
  `Info` VARCHAR(45) NULL,
  `Price` INT NOT NULL,
  `Status` TINYINT NOT NULL,
  `tripNo` INT NOT NULL,
  PRIMARY KEY (`tichketNo`, `tripNo`),
  INDEX `fk_TICKET_TRIP1_idx` (`tripNo` ASC) VISIBLE,
  CONSTRAINT `fk_TICKET_TRIP1`
    FOREIGN KEY (`tripNo`)
    REFERENCES `datvexekhach`.`trip` (`tripNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`user` (
  `Name` VARCHAR(100) NOT NULL,
  `phoneNum` VARCHAR(45) NOT NULL,
  `Dob` DATE NULL,
  `Sex` VARCHAR(45) NULL,
  `Address` VARCHAR(100) NULL,
  `acc` VARCHAR(45) NULL,
  `pass` VARCHAR(45) NULL,
  PRIMARY KEY (`phoneNum`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`order` (
  `ticketNo` INT NOT NULL,
  `user_phoneNum` VARCHAR(45) NOT NULL,
  `TimeBuy` DATETIME NOT NULL,
  PRIMARY KEY (`ticketNo`, `user_phoneNum`),
  INDEX `fk_TICKET_has_USER_USER1_idx` (`user_phoneNum` ASC) VISIBLE,
  INDEX `fk_TICKET_has_USER_TICKET1_idx` (`ticketNo` ASC) VISIBLE,
  CONSTRAINT `fk_TICKET_has_USER_TICKET1`
    FOREIGN KEY (`ticketNo`)
    REFERENCES `datvexekhach`.`ticket` (`tichketNo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_TICKET_has_USER_USER1`
    FOREIGN KEY (`user_phoneNum`)
    REFERENCES `datvexekhach`.`user` (`phoneNum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `datvexekhach`.`bill`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `datvexekhach`.`bill` (
  `billNo` INT NOT NULL,
  `Time` DATETIME NOT NULL,
  `Price` INT NOT NULL,
  `userphoneNum` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`billNo`, `userphoneNum`),
  INDEX `fk_BILL_USER1_idx` (`userphoneNum` ASC) VISIBLE,
  CONSTRAINT `fk_BILL_USER1`
    FOREIGN KEY (`userphoneNum`)
    REFERENCES `datvexekhach`.`user` (`phoneNum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;



INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('H?? N???i');
INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('H??ng Y??n');
INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('H???i Ph??ng');
INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('Nam ?????nh');
INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('Ngh??? An');
INSERT INTO `datvexekhach`.`busStation` (`BName`) VALUES ('B???c Giang');


INSERT INTO `datvexekhach`.`route` (`routeNum`, `from`, `dropOffPoint`, `Bus_Station_BName`) VALUES ('1', 'H?? N???i', 'H??ng Y??n', 'H?? N???i');
INSERT INTO `datvexekhach`.`route` (`routeNum`, `from`, `dropOffPoint`, `Bus_Station_BName`) VALUES ('2', 'H?? N???i', 'Ngh??? An', 'H?? N???i');
INSERT INTO `datvexekhach`.`route` (`routeNum`, `from`, `dropOffPoint`, `Bus_Station_BName`) VALUES ('3', 'H?? N???i', 'Nam ?????nh', 'H?? N???i');


INSERT INTO `datvexekhach`.`trip` (`tripNo`, `Time`, `numOfSeat`, `routeNum`) VALUES ('101', '2021-05-15 15:00:00', '40', '1');
INSERT INTO `datvexekhach`.`trip` (`tripNo`, `Time`, `numOfSeat`, `routeNum`) VALUES ('102', '2021-05-15 10:30:00', '30', '2');
INSERT INTO `datvexekhach`.`trip` (`tripNo`, `Time`, `numOfSeat`, `routeNum`) VALUES ('103', '2021-05-15 11:00:00', '30', '2');
INSERT INTO `datvexekhach`.`trip` (`tripNo`, `Time`, `numOfSeat`, `routeNum`) VALUES ('104', '2021-05-15 16:00:00', '40', '3');

INSERT INTO `datvexekhach`.`coach` (`licensePlates`, `coachName`, `tripNo`) VALUES ('37B-10000', 'xe1', '101');
UPDATE `datvexekhach`.`coach` SET `coachName` = 'xe1chuyen2', `tripNo` = '102' WHERE (`licensePlates` = '37B-10000') and (`tripNo` = '101');
INSERT INTO `datvexekhach`.`coach` (`licensePlates`, `coachName`, `tripNo`) VALUES ('30B-11111', 'xe2chuyen2', '103');
INSERT INTO `datvexekhach`.`coach` (`licensePlates`, `coachName`, `tripNo`) VALUES ('29B-11111', 'xe1chuyen1', '101');
INSERT INTO `datvexekhach`.`coach` (`licensePlates`, `coachName`, `tripNo`) VALUES ('29B-00000', 'xe1chuyen3', '104');




INSERT INTO `datvexekhach`.`user` (`Name`, `phoneNum`, `acc`, `pass`) VALUES ('Nguyen Van Hai', '0123456789', 'haihy', '112233');
INSERT INTO `datvexekhach`.`user` (`Name`, `phoneNum`, `acc`, `pass`) VALUES ('Nguyen Trong Dat', '0888888888', 'datntrong', '112233');
INSERT INTO `datvexekhach`.`user` (`Name`, `phoneNum`, `acc`, `pass`) VALUES ('Vu Manh Cuong', '0111111111', 'cuongvu', '112233');



INSERT INTO `datvexekhach`.`ticket` (`tichketNo`, `Price`, `Status`, `tripNo`) VALUES ('1111', '200000', '0', '102');
INSERT INTO `datvexekhach`.`ticket` (`tichketNo`, `Price`, `Status`, `tripNo`) VALUES ('1112', '300000', '1', '103');
INSERT INTO `datvexekhach`.`ticket` (`tichketNo`, `Price`, `Status`, `tripNo`) VALUES ('1113', '100000', '1', '104');
INSERT INTO `datvexekhach`.`ticket` (`tichketNo`, `Price`, `Status`, `tripNo`) VALUES ('1114', '70000', '1', '101');




INSERT INTO `datvexekhach`.`order` (`ticketNo`, `user_phoneNum`, `TimeBuy`) VALUES ('1111', '0111111111', '2021-03-10 20:00:00');
INSERT INTO `datvexekhach`.`order` (`ticketNo`, `user_phoneNum`, `TimeBuy`) VALUES ('1112', '0123456789', '2021-03-10 20:00:00');
INSERT INTO `datvexekhach`.`order` (`ticketNo`, `user_phoneNum`, `TimeBuy`) VALUES ('1113', '0123456789', '2021-03-10 20:00:00');
INSERT INTO `datvexekhach`.`order` (`ticketNo`, `user_phoneNum`, `TimeBuy`) VALUES ('1114', '0123456789', '2021-03-10 20:00:00');

