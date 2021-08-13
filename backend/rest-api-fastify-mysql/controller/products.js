const newsModel = require('../models/productsModel')

async function getProductsList (request, reply) {
 
    const newsData = await newsModel.newsList();

    var response = {data:newsData[0]}
    return reply.status(200).send(response);
}


async function getProductsSearch (request, reply) {  
 const newsData = await newsModel.newsSearch(request.params.color);
 console.log(request.params.color);
 console.log(request.params.color.substring(6));
  if (newsData.length > 0) {
      return reply.status(200).send({ data:newsData[0] });
  } else {
      return reply.status(500).send({ error: "News Not found!"});
  }
}
async function getProductsSearchCatalogColor (request, reply) {  
  if(request.params != ""){

  console.log(request.params.catalogcolor.substring(7));
  console.log(request.params.catalogcolor.substring(0,6));

    const color = request.params.catalogcolor.substring(6);
    const catalog = request.params.catalogcolor.substring(0,6)
     newsData = await newsModel.newsSearchCatalogColor(catalog,color);
  }
   if (newsData.length > 0) {
       return reply.status(200).send({ data:newsData[0] });
   } else {
       return reply.status(500).send({ error: "News Not found!"});
   }
 }
 async function postProduct (request, reply) {  
    if(request.body != ""){
      const color = request.body.color;
      const catalog_name = request.body.catalog_name;
      const size = request.body.size;
      const quantity = request.body.quantity;
      const del_flg = request.body.del_flg;
      const location_name = request.body.location_name;
      await newsModel.postProduct(catalog_name,location_name,size,quantity,del_flg,color);
      return reply.status(200).send({message: ' success', code: 200});
    }
   }
   async function updateProduct (request, reply) {  
    if(request.body != ""){
      const id = request.body.id; 
      const color = request.body.color;
      const catalog_name = request.body.catalog_name;
      const size = request.body.size;
      const quantity = request.body.quantity;
      const del_flg = request.body.del_flg;
      const location_name = request.body.location_name;
      await newsModel.updateProduct(catalog_name,location_name,size,quantity,del_flg,color,id);
      return reply.status(200).send({message: ' success', code: 200});
    }
   }
   async function deleteProduct (request, reply) {  
    if(request.body != ""){
      const id = request.body.id;
      console.log(request.body.id);
      await newsModel.deleteProduct(id);
      return reply.status(200).send({message: ' success', code: 200});
    }
   }

module.exports = {
    getProductsList,updateProduct,
    getProductsSearch,getProductsSearchCatalogColor,postProduct,deleteProduct
};
