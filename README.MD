CREATE TABLE invoice
(
  id character varying(255) NOT NULL,
  invoice_date date,
  invoice_number character varying(30),
  customer character varying(50),
  CONSTRAINT invoice_pkey PRIMARY KEY (id),
  CONSTRAINT uk_t6xkdjx1qtd5whp2iljdfn2yj UNIQUE (invoice_number)
);

CREATE TABLE invoice_item
(
  id character varying(255) NOT NULL,
  price numeric(10,3),
  qty numeric(5,2),
  invoice_id character varying(255),
  product_id character varying(255),
  CONSTRAINT invoice_item_pkey PRIMARY KEY (id),
  CONSTRAINT invoice_invoice_item_fk FOREIGN KEY (invoice_id)
      REFERENCES invoice (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE NO ACTION
);

Request Header
![POST Invoices Header](/assets/POST%20Invoices%20Header_9w546f2s2.PNG)

Request Body
![POST Invoices Body](/assets/POST%20Invoices%20Body.PNG)