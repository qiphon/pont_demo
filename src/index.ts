import { addPet, getPetById } from "./services/mods";



// API 包含所有接口
getPetById
  .request({
    petId: 3
  })
  .then(p => {
    console.log(p.name);
  });

addPet.request({}, []);

console.log(123)