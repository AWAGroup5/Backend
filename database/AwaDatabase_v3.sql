-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema AWAdb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema AWAdb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `AWAdb` DEFAULT CHARACTER SET utf8 ;
USE `AWAdb` ;

-- -----------------------------------------------------
-- Table `AWAdb`.`customer`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`customer` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`customer` (
  `idcustomer` INT(11) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idcustomer`))
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AWAdb`.`manager`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`manager` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`manager` (
  `idmanager` INT(11) NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(45) NULL DEFAULT NULL,
  `password` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idmanager`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AWAdb`.`restaurant`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`restaurant` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`restaurant` (
  `idrestaurant` INT(11) NOT NULL AUTO_INCREMENT,
  `idmanager` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `type` VARCHAR(15) NULL DEFAULT NULL,
  `openInfo` VARCHAR(45) NULL DEFAULT NULL,
  `priceLevel` INT(11) NULL DEFAULT NULL,
  PRIMARY KEY (`idrestaurant`, `idmanager`),
  INDEX `fk_restaurant_manager1_idx` (`idmanager` ASC) VISIBLE,
  CONSTRAINT `fk_restaurant_manager1`
    FOREIGN KEY (`idmanager`)
    REFERENCES `AWAdb`.`manager` (`idmanager`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AWAdb`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`orders` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`orders` (
  `idorder` INT(11) NOT NULL AUTO_INCREMENT,
  `idcustomer` INT(11) NOT NULL,
  `status` VARCHAR(20) NULL DEFAULT NULL,
  `cost` FLOAT NULL DEFAULT NULL,
  `idrestaurant` INT(11) NOT NULL,
  PRIMARY KEY (`idorder`, `idcustomer`, `idrestaurant`),
  INDEX `fk_order_customer1_idx` (`idcustomer` ASC) VISIBLE,
  INDEX `fk_orders_restaurant1_idx` (`idrestaurant` ASC) VISIBLE,
  CONSTRAINT `fk_order_customer1`
    FOREIGN KEY (`idcustomer`)
    REFERENCES `AWAdb`.`customer` (`idcustomer`),
  CONSTRAINT `fk_orders_restaurant1`
    FOREIGN KEY (`idrestaurant`)
    REFERENCES `AWAdb`.`restaurant` (`idrestaurant`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AWAdb`.`category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`category` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`category` (
  `idcategory` INT NOT NULL AUTO_INCREMENT,
  `idrestaurant` INT(11) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`idcategory`, `idrestaurant`),
  INDEX `fk_category_restaurant1_idx` (`idrestaurant` ASC) VISIBLE,
  CONSTRAINT `fk_category_restaurant1`
    FOREIGN KEY (`idrestaurant`)
    REFERENCES `AWAdb`.`restaurant` (`idrestaurant`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `AWAdb`.`product`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`product` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`product` (
  `idproduct` INT(11) NOT NULL AUTO_INCREMENT,
  `idcategory` INT NOT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `price` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`idproduct`, `idcategory`),
  INDEX `fk_product_category2_idx` (`idcategory` ASC) VISIBLE,
  CONSTRAINT `fk_product_category2`
    FOREIGN KEY (`idcategory`)
    REFERENCES `AWAdb`.`category` (`idcategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `AWAdb`.`quantity`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `AWAdb`.`quantity` ;

CREATE TABLE IF NOT EXISTS `AWAdb`.`quantity` (
  `idorder` INT(11) NOT NULL,
  `idproduct` INT(11) NOT NULL,
  PRIMARY KEY (`idorder`, `idproduct`),
  INDEX `fk_quantity_product1_idx` (`idproduct` ASC) VISIBLE,
  CONSTRAINT `fk_quantity_orders1`
    FOREIGN KEY (`idorder`)
    REFERENCES `AWAdb`.`orders` (`idorder`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_quantity_product1`
    FOREIGN KEY (`idproduct`)
    REFERENCES `AWAdb`.`product` (`idproduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
