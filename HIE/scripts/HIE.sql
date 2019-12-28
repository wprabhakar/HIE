$ isql -user SYSDBA -password masterkey
isql> drop database ;
isql> connect 'HIE-N' ;
#create database 'HIE-N' user 'SYSDBA' password 'masterkey' ;
#isql-fb -user SYSDBA -pass masterkey

create DOMAIN SEQID INTEGER not null ;
create DOMAIN NAME  VARCHAR(40) ;
create DOMAIN DESCRIPTION  VARCHAR(400) ;
create DOMAIN CATEGORY  VARCHAR(50) ;
create DOMAIN ADDRESS  VARCHAR(50) ;
create DOMAIN EMAIL  VARCHAR(30) ;
create DOMAIN PHONE VARCHAR(20) ;
create DOMAIN PASSWORD VARCHAR(20) ;
create DOMAIN AMOUNT DECIMAL(10,2) ;
create DOMAIN CDATE TIMESTAMP default current_timestamp ;
create DOMAIN IMAGEURL VARCHAR(100) ;
create DOMAIN BookingNumber INTEGER ;

/*
create TABLE ConfigDB
(
  Name     VARCHAR(30),
  Description CHAR(100) 
) ;
insert into ConfigDB values ( 'Promotion', 'Y') ;
insert into ConfigDB values ( 'StripeAccount', 'acct_19QW1uH6OheHrAbE') ;
*/

CREATE TABLE Slides 
(
  IMAGE_URL    VARCHAR(255),
  isActive    CHAR(1) DEFAULT 'Y'
) ;

insert into Slides ( IMAGE_URL ) values ( 'Logo.jpeg' ) ;
 
create TABLE Users
(
  ID        SEQID,
  Name      NAME,
  Email     EMAIL,
  Password  PASSWORD,
  Mobile    PHONE,
  Address   ADDRESS,
  CreatedOn CDATE,
  CreatedBy NAME,
  ModifiedBy NAME,
  ModifiedOn CDATE,
  OUTLET_PHONE    PHONE,
  Location  VARCHAR(5),
  /*
  PickupStart INTEGER DEFAULT 900,
  PickupEnd INTEGER DEFAULT 2100,
  PickupInterval INTEGER DEFAULT 30,*/  /* Minutes */
  /*--http://nishanthkabra.com/ionic2push.html*/
  DeviceReg VARCHAR(256),
  DeviceUID VARCHAR(256),
  isActive  CHAR(1) DEFAULT 'Y',
  IMAGE_URL   VARCHAR(400) default 'Logo.jpeg',
  Region    CHAR(5), /* N, E, W, S, C */
  Type      CHAR(1) default 'C', /* C - Customer, M - Merchant, A - Admin */
  LoginType CHAR(1) default 'H', /* F - Facebook, H - HaveItEarly */
  ADDITIONAL_INFO VARCHAR(200)
) ;
create index Users_ID on Users ( ID ) ;
create unique index Users_Email on Users ( Email ) ;

create TABLE Product
(
  ID          SEQID,
  Users_ID    SEQID,
  Title       NAME,
  Description DESCRIPTION,
  Usual_Price       AMOUNT,
  Image_URL    VARCHAR(100),
  CreatedBy   VARCHAR(20),
  CreatedOn   CDATE,
  ModifiedBy  VARCHAR(20),
  ModifiedOn  CDATE,
  isActive    CHAR(1) DEFAULT 'Y'
) ;
create index Product_ID on Product ( ID ) ;
create index Product_Users_ID on Product ( Users_ID ) ;

create TABLE MerchantCuisine
(
  Users_ID   SEQID,
  Cuisine   VARCHAR(20)
) ;
create index MerchantCuisine_Users_ID on MerchantCuisine ( Users_ID ) ;
create index MerchantCuisine_Cuisine on MerchantCuisine ( Cuisine ) ;

insert into MerchantCuisine ( Users_ID, Cuisine ) values ( 3, 'Others' ) ;
insert into MerchantCuisine ( Users_ID, Cuisine ) values ( 4, 'Others' ) ;

/*

SET TERM ^ ;
CREATE or ALTER PROCEDURE MerchantList (  ) returns ( ID INTEGER, ADDITIONAL_INFO VARCHAR(200), Type VARCHAR(1) )
AS
DECLARE VARIABLE LoginType VARCHAR(1) ;
BEGIN
  select DISTINCT ID, Name, IMAGE_URL, Region, (select CAST(LIST(CUISINE, ',') AS VARCHAR(4096)) CUISINES from MerchantCuisine m where m.Users_ID = Users.ID),(select max(rate) RATE from discount where Users_ID = Users.ID ) RATE,(select min(AdvanceDays) ADVANCE_DAYS from discount where RATE in ( select MAX(RATE) from Discount where Users_ID = Users.ID )) from Users,MerchantCuisine m  where Region like '@REGION@' and m.Users_ID = ID and m.Cuisine in ( @CUISINE@ ) and IsActive = 'Y'


  select Users_ID, Max(Rate) from Discount ; 
  select ID, ADDITIONAL_INFO, LoginType, Type From Users where Email = :Email 
    into :ID, :ADDITIONAL_INFO, :LoginType, :Type ;
  if ( LoginType = 'F') THEN
  BEGIN
    suspend ;
  END
  if ( ID IS NULL ) THEN
  BEGIN
    INSERT INTO Users ( Email, Name, Additional_INFO, LoginType ) values ( :Email, :Name, :UserID, 'F' ) returning ID, Additional_INFO, Type into :ID, :ADDITIONAL_INFO, :Type ;
    suspend ;
  END
END ^
SET TERM ; ^

*/
create TABLE Discount
(
  ID          SEQID,
  Users_ID    SEQID,
  Product_ID  SEQID,
  Rate        AMOUNT,
  AdvanceDays INTEGER,
  CreatedBy   NAME,
  CreatedOn   CDATE,
  ModifiedBy  NAME,
  ModifiedOn  CDATE,
  isActive    CHAR(1) DEFAULT 'Y',
  isDeleted   CHAR(1) DEFAULT 'N'
) ;
create index Discount_ID on Discount ( ID ) ;
create index Discount_Users_ID on Discount ( Users_ID ) ;
create index Discount_Product_ID on Discount ( Product_ID ) ;


/*
create Table Promotion
(
  ID          SEQID,
  Product_ID  SEQID,
  Rate        AMOUNT,
  ValidFrom   CDATE,
  ValidTo     CDATE,
  CreatedBy   NAME,
  CreatedOn   CDATE,
  ModifiedOn  NAME,
  ModifiedBy  CDATE,
  isActive    CHAR(1) DEFAULT 'Y'
) ;
*/
create Table Transaction
(
  ID            SEQID,
  CUsers_ID      SEQID,
  MUsers_ID     SEQID,
  PaymentMethod VARCHAR(15),
  PaymentOn     CDATE,
  AmountPaid    AMOUNT,  
  IsPaymentConfirmed CHAR(1) default 'N',
  PickUpOn      CDATE,
  PickupStart    INTEGER,
  PickupEnd    INTEGER, /* Use Trigger to calculate */
  PaymentRef    VARCHAR(100),
  Customer_Name VARCHAR(100),
  CreatedBy     NAME,
  CreatedOn     CDATE,
  ModifiedOn    NAME,
  ModifiedBy    CDATE,
  BookingRef    VARCHAR(20),
  Comment       VARCHAR(100),
  isActive      CHAR(1) DEFAULT 'Y',
  Status        CHAR(1) default 'P' /* P - Pending, C - Confirmed, D - Delivered */
) ;
create index Transaction_ID on Transaction ( ID ) ;
create index Transaction_CUsers_ID on Transaction ( CUsers_ID ) ;
create index Transaction_MUsers_ID on Transaction ( MUsers_ID ) ;

create Table TransactionDetails
(
  Transaction_ID  SEQID,
  MUsers_ID        SEQID, /* Use Trigger */
  Product_ID      SEQID,
  Quantity	      INTEGER,
  Usual_Price     AMOUNT,
  DiscountedPrice AMOUNT
/*  PromotionPrice  AMOUNT, */
) ;
create index TD_Transaction_ID on TransactionDetails ( Transaction_ID ) ;

create Table Review
(
  ID          SEQID,
  Users_ID    SEQID,
  Description DESCRIPTION,
  CreatedBy   NAME,
  CreatedOn   CDATE,
  ModifiedOn  NAME,
  ModifiedBy  CDATE,
  isActive    CHAR(1) DEFAULT 'Y'
) ;
create index Review_ID on Review ( ID ) ;
create index Review_Users_ID on Review ( Users_ID ) ;


create Table Feedback
(
  ID          SEQID,
  Users_ID     SEQID,
  ForUser_ID  INTEGER,    
  Description DESCRIPTION,
  CreatedBy   NAME,
  CreatedOn   CDATE,
  ModifiedOn  NAME,
  ModifiedBy  CDATE,
  isActive    CHAR(1) DEFAULT 'Y'
) ;
create index Feedback_ID on Feedback ( ID ) ;
create index Feedback_Users_ID on Feedback ( Users_ID ) ;

CREATE SEQUENCE SEQ_UniqueID ;

SET TERM !! ;
CREATE TRIGGER TBIUsers FOR Users
BEFORE INSERT AS
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
END !!
SET TERM ; !!

SET TERM !! ;
CREATE TRIGGER TBIProduct FOR Product
BEFORE INSERT AS
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
END !!
SET TERM ; !!

SET TERM !! ;
CREATE TRIGGER TBIDiscount FOR Discount
BEFORE INSERT AS
DECLARE ID INTEGER = 0 ;
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END
  select Users_ID from Product where ID = new.PRODUCT_ID INTO new.Users_ID ;

END !!
SET TERM ; !!

/*
SET TERM !! ;
CREATE TRIGGER TBIPromotion FOR Promotion
BEFORE INSERT AS
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
END !!
SET TERM ; !!
*/
SET TERM !! ;
CREATE TRIGGER TBITransactionDetails FOR TransactionDetails
BEFORE INSERT AS
BEGIN
  select Users_ID, Usual_Price from Product where ID = new.Product_ID
    into new.MUsers_ID, new.Usual_Price ;
END !!
SET TERM ; !!

SET TERM !! ;
CREATE TRIGGER TBIReview FOR Review
BEFORE INSERT AS
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
END !!
SET TERM ; !!

SET TERM !! ;
CREATE TRIGGER TBIFeedback FOR Feedback
BEFORE INSERT AS
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
END !!
SET TERM ; !!
/*
drop procedure getMerchants ;
SET TERM ^ ;
CREATE PROCEDURE getMerchants ( I_Region VARCHAR(10), I_Cuisine VARCHAR(200) )
      returns ( ID INTEGER,
        REGION VARCHAR(20),
        LOGO_URL VARCHAR(400),
        NAME NAME,
        CUISINES VARCHAR(200),
        RATE INTEGER,
        ADVANCE_DAYS INTEGER
 )
AS
BEGIN
  FOR  select DISTINCT ID, Name, Picture, Region from Users, MerchantCuisine m where Region like :I_REGION and m.Users_ID = ID and m.Cuisine in ( :I_CUISINE )
  into :ID, :NAME, :LOGO_URL, :REGION 
  DO BEGIN
    select FIRST 1 AdvanceDays, RATE from Discount where Rate = ( select MAX(RATE) from Discount where Users_ID = :ID ) into 
    :ADVANCE_DAYS, :RATE ;
       select LIST(CUISINE, ',') from MerchantCuisine m where m.Users_ID = :ID INTO :CUISINES ;
      SUSPEND ;
  END 
END ^
SET TERM ; ^ ;
*/
--select * from fetchDiscounts ( 3, '2017-07-09') ;
SET TERM ^ ;
CREATE or ALTER PROCEDURE fetchDiscounts ( MID INTEGER, CDATE  DATE ) returns ( P_ID INTEGER, RATE INTEGER, ADVANCEDAYS INTEGER )
AS
BEGIN
  FOR  select p.ID,  Max(d.AdvanceDays) ADVANCE_DAYS from discount d, product p where d.Users_ID = :MID and d.ISActive = 'Y' and p.ISACTIVE = 'Y' and d.isDeleted = 'N' and d.product_id = p.id and d.AdvanceDays <= (cast( :CDATE as date) - cast( 'now' as date) ) GROUP BY p.ID into :P_ID, :ADVANCEDAYS 
  DO BEGIN
    FOR select MAX(RATE) from Discount where PRODUCT_ID = :P_ID and ISActive = 'Y' and PRODUCT_ID = :P_ID and ADVANCEDAYS = :ADVANCEDAYS INTO :RATE 
    DO BEGIN
    suspend ;
    END
  END
END ^
SET TERM ; ^


SET TERM ^ ;
CREATE or ALTER PROCEDURE resetPassword ( IEmail VARCHAR(20), IPASSWORD VARCHAR(20) ) returns ( EMAIL EMAIL, NAME NAME,  NEW_PASSWORD PASSWORD )
AS
DECLARE VARIABLE LoginType VARCHAR(1) ;
BEGIN
  update Users set Password = :IPASSWORD where email = :IEMAIL returning Password, Email, Name
  INTO :NEW_PASSWORD, :EMAIL, :NAME ;
  suspend ;
END ^
SET TERM ; ^

SET TERM ^ ;
CREATE or ALTER PROCEDURE getOrderNumber returns ( bookingRef VARCHAR(20) )
AS
BEGIN
  select left(replace(replace(replace(cast(cast('now' as timestamp) as varchar(24)), '-', ''), ':', '' ), ' ', '' ), 14) from RDB$DATABASE 
  into :bookingRef ;
  suspend ;
END ^
SET TERM ; ^

SET TERM ^ ;
CREATE or ALTER PROCEDURE FBLogin ( Email VARCHAR(100), Name VARCHAR(100), UserID VARCHAR(20) ) returns ( ID INTEGER, ADDITIONAL_INFO VARCHAR(200), Type VARCHAR(1) )
AS
DECLARE VARIABLE LoginType VARCHAR(1) ;
BEGIN
  select ID, ADDITIONAL_INFO, LoginType, Type From Users where Email = :Email 
    into :ID, :ADDITIONAL_INFO, :LoginType, :Type ;
  if ( LoginType = 'F') THEN
  BEGIN
    suspend ;
  END
  if ( ID IS NULL ) THEN
  BEGIN
    INSERT INTO Users ( Email, Name, Additional_INFO, LoginType ) values ( :Email, :Name, :UserID, 'F' ) returning ID, Additional_INFO, Type into :ID, :ADDITIONAL_INFO, :Type ;
    suspend ;
  END
END ^
SET TERM ; ^



SET TERM ^ ;
CREATE or ALTER PROCEDURE getBookingRef returns ( bookingRef VARCHAR(5) )
AS
DECLARE VARIABLE charSet VARCHAR(62) ;
DECLARE VARIABLE ref VARCHAR(6) ;
DECLARE VARIABLE i integer = 0 ;
DECLARE VARIABLE randomPoz integer;
BEGIN
  select '0ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789abcdefghijklmnopqrstuvwxyz' from RDB$DATABASE
    INTO :charSet ;
  ref = '' ;
  while ( i < 5 )
  DO
  begin
      randomPoz = rand() * 35 ; /*charSet.length;*/
      select :ref || substring(:charSet from (:randomPoz+1) for 1 ) from RDB$DATABASE INTO :ref ;
      i = i + 1 ;
  END
  bookingRef = ref ;
  suspend ;
END ^
SET TERM ; ^

SET TERM !! ;
CREATE TRIGGER TBITransaction FOR Transaction
BEFORE INSERT AS
DECLARE VARIABLE TMP integer  ;
DECLARE VARIABLE PI integer ;
DECLARE VARIABLE H integer ;
DECLARE VARIABLE M integer ;
BEGIN
  IF ( new.ID IS NULL ) THEN
    BEGIN
      new.ID = NEXT VALUE FOR SEQ_UniqueID ;
    END  
  select Name from Users where ID = new.CUsers_ID into new.Customer_Name ;
  -- select PickupInterval from Users where ID = new.ID INTO :PI ;
  -- H = ( new.PickupStart + PI ) / 100  ;
  -- M = ( new.PickupStart + PI ) - H * 100 ;
  -- IF ( PI = 60 ) THEN
  -- BEGIN
  --   H = H + 1 ;
  --   M = 0 ;
  -- END
  -- new.PickupEnd = ( H * 100 + M ) ;
  select BookingRef from getOrderNumber into new.BookingRef ;
END !!
SET TERM ; !!


insert into Users ( Name, Email, Password, Mobile, Location, OUTLET_PHONE, Address, Type )
  values ( 'user1', 'user1@user1.com', 'user1', '11111111', 'South', '00000000', 'User1Address', 'C' ) ;
insert into Users ( Name, Email, Password, Mobile, Location, OUTLET_PHONE, Address, Type )
  values ( 'user2', 'user2@user2.com', 'user2', '22222222', 'South','11111111', 'User2Address', 'C' ) ;

insert into Users ( Name, Email, Password, Mobile, LOCATION, OUTLET_PHONE, Address, Type, Region )
  values ( 'Muser1', 'Muser1@user1.com', 'Muser1', 'M11111111', 'South', 'M00000000', 'MUser1Address', 'M', 'North' ) ;
insert into Users ( Name, Email, Password, Mobile, OUTLET_PHONE, Address, Type, Region )
  values ( 'Muser2', 'Muser2@user2.com', 'Muser2', 'M22222222', 'M11111111', 'MUser2Address', 'M', 'South' ) ;

insert into Product ( Users_ID, Title, Description, Usual_Price, Image_URL )
  values ( (select first 1 ID from Users where NAME = 'Muser1'), 'Fries', 'Hot Fries', 15.00, 'fries.jpg' ) ;
insert into Product ( Users_ID, Title, Description, Usual_Price, Image_URL )
  values ( (select first 1 ID from Users where NAME = 'Muser1'), 'Onion Rings', 'Hot Onion Rings', 32.00, 'onionrings.jpg' ) ;
insert into Product ( Users_ID, Title, Description, Usual_Price, Image_URL )
  values ( (select first 1 ID from Users where NAME = 'Muser2'), 'Oil less Fries', 'Hot Oil less Fries', 21.00, 'oillessfries.jpg' ) ;

insert into Product ( Users_ID, Title, Description, Usual_Price, Image_URL )
  values ( (select first 1 ID from Users where NAME = 'Muser1'), 'Wine', 'Cold Drink', 15.00, 'fries.jpg' ) ;

insert into Product ( Users_ID, Title, Description, Usual_Price, Image_URL )
  values ( (select first 1 ID from Users where NAME = 'Muser2'), 'Coffee', 'Coffee',  15.00, 'fries.jpg' ) ;

insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 5, 10, 3 ) ;
insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 5, 15, 5 ) ;

insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 6, 6, 2 ) ;
insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 6, 12, 3 ) ;

insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 7, 7, 2 ) ;
insert into Discount ( Product_ID, Rate, AdvanceDays )
  values ( 7, 14, 4 ) ;

commit ;


/*
select DISTINCT ID, Name, Picture LOGO_URL, Region, (select LIST(CUISINE, ',') CUISINES from MerchantCuisine m where m.Users_ID = Users.ID),
(select max(rate) RATE from discount where Users_ID = Users.ID ) MRATE,
(select min(AdvanceDays) ADVANCE_DAYS from discount where RATE in ( select MAX(RATE) from Discount where Users_ID = Users.ID )) from Users, MerchantCuisine m  where Region like '%' and m.Users_ID = ID and m.Cuisine in ( 'Japanese', 'Others' ) ;
*/

create table LOG 
(
  MESSAGE VARCHAR(4000)
) ;
