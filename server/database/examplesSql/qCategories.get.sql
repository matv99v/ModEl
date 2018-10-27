# Thu Oct 25 2018 13:23:16 GMT+0300 (EEST)
# Parameters: {"enabled":"true","excludeProductsCount":"0"}

            SELECT *, (
            SELECT count(*)
                FROM products
                    WHERE products.idCategory = category.idCategory
                    AND exist = true
        ) AS goodsCount
                FROM category
                    HAVING goodsCount <> 0
                    ORDER BY CategoryName
        
