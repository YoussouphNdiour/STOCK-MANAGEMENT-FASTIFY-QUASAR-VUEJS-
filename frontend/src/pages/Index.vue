<template>
  <q-page>
    <div class="q-pa-md">
      <q-form @submit="onSubmit"
      class="q-gutter-md">
        <q-input
          rounded outlined
          v-model="catalog_name"
          type="text"
          label="catalog_name"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          rounded outlined
          v-model="color"
          type="text"
          label="color"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          rounded outlined
          v-model="size"
          type="text"
          label="size"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-input
          rounded outlined
          v-model="quantity"
          type="text"
          label="quantity"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
      </q-form>
       <div>
          <q-btn label="envoyer" @click="onSubmit"  color="primary"/>
          <q-btn label="modifier" @click="update(selected[0].id)"  color="primary"/>
          <q-btn label="supprimer" @click="deleted(selected[0].id)"  color="primary"/>
          <q-btn label="annuler" @click="onReset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
    <q-input borderless v-model="searchinput" v-on:keyup.enter="Inputlistener" input-class="text-left" class="q-ml-md" label="Search ..">
                    <template v-slot:prepend>
                        <q-icon  name="search" />
                    </template>
                </q-input>
         
         <q-input borderless type="file" @change="onChange" />
       
    <q-table
      title="Treats"
      :columns="columns"
      :rows="posts"
      row-key="name"
      class="col"
      selection="single"
      v-model:selected="selected"    
    />     
  </div>
  <div>{{selected}}</div>
 <q-icon style="font-size: 32px; align:center; color:blue; "
     @click="getLists"
        name="font_refresh"

      /> 
          <q-btn label="charger" @click="charger"  color="primary"/>

  </q-page>
</template>

<script>
import Axios from 'axios'
import { api } from '../boot/axios'
import XLSX from "xlsx"
function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  .split('\n').join('\\n')
  .split('\r').join('\\r')

  return `"${formatted}"`
}
export default {
  name: 'index',
  data() {
    const catalog_name = null
    const color = null
    const size = null
    const quantity = null
    return {
      selected: [],
      catalog_name,
      color,
      size,
      quantity,
      //input variable in search
      searchinput: "",
      //table column
        columns:[
          {
          name: 'id',
          required: true,
          label: 'No',
          align: 'left',
          field:'id',
          sortable: true,
          headerClasses: 'bg-dark text-white',
        },
         {
          name: 'catalog_name',
          required: true,
          label: 'Catalog',
          align: 'left',
          field:'catalog_name',
          sortable: true,
            headerClasses: 'bg-primary text-white',
        },
        {
          name: 'color',
          required: true,
          label: 'Color',
          align: 'left',
          field:'color',
          sortable: true,
          headerClasses: 'bg-dark text-white',
          
        },
        {
          name: 'size',
          required: true,
          label: 'Size',
          align: 'left',
          field:'size',
          sortable: true,
          headerClasses: 'bg-dark text-white',
        },
        {
          name: 'quantity',
          required: true,
          label: 'Quantity',
          align: 'left',
          field:'quantity',
          sortable: true,
          headerClasses: 'bg-dark text-white',
        },
        ],
        posts:[]
    }
  },
  mounted(){
this.getLists()
  },
  methods:{
    //import an excel file and display it on the table and save on the database
    onChange(event) {
      this.file = event.target.files ? event.target.files[0] : null;
      if (this.file) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type:'binary' });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, { header: 'id'});
          this.posts=data;
          console.log(data)
          //sorry I didn't have time to finish I'm in exam period

        }
        reader.readAsBinaryString(this.file);
      }
    },
    //retrieve the list from the database
    getLists(){
      return new Promise(() => {
          setTimeout(() => {
             api.get('/products')
          .then((response)=>{ 
            this.posts=response.data.data
            console.log(response.data.data);

          })
          }, 1000)
        })
     
    },
//retrieve the value in input and launch the search query
     Inputlistener(){
       if(this.searchinput.includes(' ')){
      api.get('/searchcatalogcolor/'+this.searchinput.split(" ").join(""))
          .then((response)=>{ 
            this.posts=response.data.data                       
          });
          }
          else{
            api.get('/products/'+this.searchinput)
          .then((response)=>{ 
            this.posts=response.data.data                       
          });
          }
    },
    onSubmit () {
      const article = 
      { 
      location_name:"hh",
      del_flg:"ss",
      catalog_name: this.catalog_name,
      color: this.color,
      size:this.size,
      quantity:this.quantity          
      }
      api.post('/product', article)
    this.getLists()
  },
  update(id){
    const article = 
      {
      id: id, 
      location_name:"hh",
      del_flg:"ss",
      catalog_name: this.catalog_name,
      color: this.color,
      size:this.size,
      quantity:this.quantity          
      }
    api.put('/product', article)
    this.getLists()
    this.onReset()
  },
  onReset(){
    this.id='',
    this.catalog_name ='',
    this.color='',
    this.size='',
    this.quantity=''
  },
  deleted(id){
    const article={id: id}
    console.log(article);
    api.delete('/product',article)
    this.getLists()
    this.onReset()
  },
  charger(){
     this.id=this.selected[0].id
      this.catalog_name=this.selected[0].catalog_name
      this.color=this.selected[0].color
      this.size=this.selected[0].size
      this.quantity=this.selected[0].quantity
  }
  }
}
</script>

