DROP TABLE IF EXISTS Inventory
DROP TABLE IF EXISTS Store
DROP TABLE IF EXISTS Product

CREATE TABLE Store (
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(99) NOT NULL,
    Email NVARCHAR(99) NOT NULL UNIQUE,
    Phone NVARCHAR(99) NOT NULL UNIQUE,
    Address NVARCHAR(99) NOT NULL UNIQUE
)

CREATE TABLE Product (
	Id INT PRIMARY KEY IDENTITY,
	Name NVARCHAR(99) NOT NULL,
	Price MONEY NOT NULL CHECK (Price > 0),
	Description NVARCHAR(999) NULL
)

CREATE TABLE Inventory (
	StoreId INT NOT NULL FOREIGN KEY REFERENCES Store (Id) ON DELETE CASCADE,
	ProductId INT NOT NULL FOREIGN KEY REFERENCES Product (Id) ON DELETE CASCADE,
	Stock INT NOT NULL CHECK (Stock >= 0),
    Markup MONEY NOT NULL CHECK (Markup >= 0),
	PRIMARY KEY (StoreId, ProductId)
)

INSERT INTO Store(Name, Email, Phone, Address) VALUES
	('Walmart', 'walmart01@email.com', '(619) 691-7945', '75 Broadway, Chula Vista, CA 91910');

INSERT INTO Product(Name, Price, Description) VALUES
	('Toilet Paper', 2.00, 'toilet paper 4 pack'),
	('Apples', 1.00, '1 pound bag of red apples'),
	('Play Station 5', 400.00, 'Sony PlayStation 5 1TB storage'),
	('Picture Frame', 4.00, '4 x 6 picture frame'),
	('Notebook', 1.00, '100 sheet college ruled notebook'),
	('Dell Laptop', 300.00, 'Dell laptop computer, 1TB storage with 8GB of RAM'),
	('Desk Chair', 80.00, 'black desk chair'),
	('Makeup Mirror', 30.00, 'small lighted make up mirror');

INSERT INTO Inventory(StoreId, ProductId, Stock, Markup) VALUES
	(1, 1, 50, 2.00),
	(1, 2, 30, 2.00),
	(1, 3, 20, 100.00),
	(1, 4, 30, 1.00),
	(1, 5, 50, 1.50),
	(1, 8, 15, 10.00);


SELECT * FROM Store
SELECT * FROM Product
SELECT * FROM Inventory
