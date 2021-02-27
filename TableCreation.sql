DROP TABLE IF EXISTS InventoryEntry
DROP TABLE IF EXISTS Store


CREATE TABLE Store (
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(99) NOT NULL,
    Email NVARCHAR(99) NOT NULL UNIQUE,
    Phone NVARCHAR(99) NOT NULL UNIQUE,
    Address NVARCHAR(99) NOT NULL UNIQUE
)

CREATE TABLE InventoryEntry (
	StoreId INT NOT NULL FOREIGN KEY REFERENCES Store (Id) ON DELETE CASCADE,
	SKU NVARCHAR(20) NOT NULL CHECK (LEN(SKU) >= 10),
	Name NVARCHAR(99) NOT NULL,
	Description NVARCHAR(999) NULL,
    Price MONEY NOT NULL CHECK (Price > 0),
	Stock INT NOT NULL CHECK (Stock >= 0),
	PRIMARY KEY (StoreId, SKU)
)

INSERT INTO Store(Name, Email, Phone, Address) VALUES
	('Walmart', 'walmart01@email.com', '(619) 691-7945', '75 Broadway, Chula Vista, CA 91910');

INSERT INTO InventoryEntry(StoreId, SKU, Name, Description, Price, Stock) VALUES
	(1, '5ZpE-YwD-P4n', 'Toilet Paper','toilet paper 4 pack', 3.00, 300),
	(1, 'Lt2P-9Fp-C2y', 'Play Station 5', 'Sony PlayStation 5 1TB storage', 500.00, 20),
	(1, 'ZxjJ-66u-UYE', 'Picture Frame', '4 x 6 picture frame', 4.00, 50),
	(1, 'oTSN-eKV-Y45', 'Notebook', '100 sheet college ruled notebook', 2.00, 100),
	(1, 'YZRK-AtP-Y77', 'Dell Laptop', 'Dell laptop computer, 1TB storage with 8GB of RAM', 600.00, 50),
	(1, 'Vnzb-ZKd-ugw', 'Desk Chair','black desk chair', 80.00, 10),
	(1, '74ro-xWp-pj6', 'Makeup Mirror', 'small lighted make up mirror', 15.00, 100);

SELECT * FROM Store
SELECT * FROM InventoryEntry
