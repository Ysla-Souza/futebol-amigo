-- MySQL Script generated by MySQL Workbench
-- Wed Oct 25 20:54:22 2023
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `mydb` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`matches`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`matches` ;

CREATE TABLE IF NOT EXISTS `mydb`.`matches` (
  `matches_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `adminId` INT NOT NULL,
  `data_time` DATETIME(6) NULL,
  FOREIGN KEY (`adminId`) REFERENCES `user`(`id`)
);



-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user` (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `name` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `nickname` VARCHAR(32) NOT NULL,
  `email` VARCHAR(45) NULL,
  `phone` VARCHAR(30) NULL);


-- -----------------------------------------------------
-- Table `mydb`.`user_has_matches`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `mydb`.`user_has_matches` ;

CREATE TABLE IF NOT EXISTS `mydb`.`user_has_matches` (
  `user_id` INT NOT NULL,
  `matches_matches_id` INT NOT NULL,
  `invitation` varchar(20) NOT NULL, 
  PRIMARY KEY (`user_id`, `matches_matches_id`),
  INDEX `fk_user_has_matches_matches1_idx` (`matches_matches_id` ASC) VISIBLE,
  INDEX `fk_user_has_matches_user_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_user_has_matches_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_matches_matches1`
    FOREIGN KEY (`matches_matches_id`)
    REFERENCES `mydb`.`matches` (`matches_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
