# Thu Oct 25 2018 13:22:23 GMT+0300 (EEST)
# Parameters: {"hash":"456456434252-26","excludeFields":"CategoryName,products.idCategory","zakNum":"456456434252","idProd":"26","exclFlds":["CategoryName","products.idCategory"]}

        SELECT
            curRate,frozQnty,zakupka.idProduct,productName,restQnty,zakLink,zakNumber,zakQnty,zakSum,DATE_FORMAT(zakDate, "%Y-%m-%d") AS zakDate,DATE_FORMAT(zakDateRcv, "%Y-%m-%d") AS zakDateRcv,DATE_FORMAT(zakDateShp, "%Y-%m-%d") AS zakDateShp,DATE_FORMAT(zakDateProtct, "%Y-%m-%d") AS zakDateProtct
        FROM
            zakupka,
            products,
            category
        WHERE
            zakupka.idProduct = products.idProduct

            AND zakNumber = 456456434252

            AND zakupka.idProduct = 26

            AND category.idCategory = (SELECT
                idCategory
            FROM
                products
            WHERE
                idProduct = zakupka.idProduct)

            
            
            

        ORDER BY CategoryName, productName
    
