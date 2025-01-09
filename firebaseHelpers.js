import { collection, addDoc } from 'firebase/firestore';
import { firestore } from './firebase'; 


export const addDataToFirestore = async (data) => {
  try {
    const docRef = await addDoc(collection(firestore, 'products'), data); // 'products' - имя коллекции
    console.log('Данные успешно добавлены с ID: ', docRef.id);
  } catch (e) {
    console.error('Ошибка при добавлении данных: ', e);
  }
};

export const fetchDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collection(firestore, 'products')); // 'products' - имя коллекции
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });
    console.log('Полученные данные:', products);
    return products;
  } catch (e) {
    console.error('Ошибка при чтении данных: ', e);
    return [];
  }
};
