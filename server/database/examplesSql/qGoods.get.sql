# Thu Oct 25 2018 13:23:32 GMT+0300 (EEST)
# Parameters: {"catId":"2","enabled":"1","exlcudeId":"null"}

            SELECT idCategory, products.idProduct, productName, productParams, declarePrice, detailName, textDescrip
                FROM products
                LEFT JOIN
                    descrip ON products.idProduct = descrip.idProduct
                    WHERE
                        products.idProduct !=null
                    AND
                        products.exist =1
                    AND
                        TRUE
                    AND
                        products.idCategory =2
        
