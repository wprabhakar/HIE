
-- create sequence BookingNumber ;
-- SET TERM ^ ;
-- CREATE or ALTER PROCEDURE getOrderNumber returns ( bookingRef VARCHAR(20) )
-- AS
-- DECLARE VARIABLE ID VARCHAR(3) ;
-- BEGIN
--   ID = LPAD(MOD(NEXT VALUE FOR BookingNumber,999),3, '0')  ;
--   select replace(cast(cast('now' as date) as varchar(10)), '-', '') || :ID  from RDB$DATABASE
--   into :bookingRef ;
--   suspend ;
-- END ^
-- SET TERM ; ^

SET TERM ^ ;
CREATE or ALTER PROCEDURE UpdateMerchantProfile ( Name NAME, Email EMAIL, Mobile PHONE, Outlet_Phone PHONE, Address ADDRESS, UID INTEGER, Food_Type ADDRESS )
AS
declare variable LASTPOS integer;
declare variable NEXTPOS integer;
declare variable TEMPSTR varchar(8192);
BEGIN
  delete from MerchantCuisine where Users_ID = :UID ;
  Food_Type = :Food_Type || ',';
  LASTPOS = 1;
  NEXTPOS = position(',', :Food_Type, LASTPOS);
  while (:NEXTPOS > 1) do
  begin
    TEMPSTR = substring(:Food_Type from :LASTPOS for :NEXTPOS - :LASTPOS);
    insert into MerchantCuisine( Users_ID, Cuisine) values(:UID, :TEMPSTR);
    LASTPOS = :NEXTPOS + 1;
    NEXTPOS = position(',', :Food_Type, LASTPOS);
  end
  update Users set name = :NAME, email = :EMAIL, mobile = :MOBILE, OUTLET_PHONE = :OUTLET_PHONE, address = :ADDRESS where ID = :UID ;
END ^
SET TERM ; ^
