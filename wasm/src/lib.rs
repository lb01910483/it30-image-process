
use wasm_bindgen::prelude::*;

extern crate wasm_bindgen;

extern crate console_error_panic_hook;

use std::panic;

// #[macro_use]
// extern crate serde_derive;

use wasm_bindgen::prelude::*;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
pub fn fib(i: u32) -> u32 {
    match i {
        0 => 0,
        1 => 1,
        _ => fib(i-1) + fib(i-2)
    }
}

// #[wasm_bindgen]
// pub fn receive_example_from_js(val: &JsValue) -> JsValue {
//     panic::set_hook(Box::new(console_error_panic_hook::hook));
//     let mut image: Vec<u32> = val.into_serde().unwrap();
//     let mut count = 0;
//         while count < image.len() {
//             let avg: u32 = (image[count] + image[count + 1] + image[count + 2]) / 3;
//             image[count] = avg; // red
//             image[count + 1] = avg; // green
//             image[count + 2] = avg; // blue
//             count = count + 4;
//         }
//     JsValue::from_serde(&image).unwrap()
// }

// pub unsafe fn transmuteClamp(val: u16) -> u8{
//     if val > 255 {
//         return 255
//     } else if val < 0 {
//         return 0
//     }
//         return val as u8
// }
// #[wasm_bindgen]
// pub fn receive_example_from_js(mut val: Clamped<Vec<u8>>) -> Clamped<Vec<u8>> {
//     panic::set_hook(Box::new(console_error_panic_hook::hook));
//     let mut count = 0;
//         while count < val.len() {
//         let tmp  = (val[count] as u16 + val[count + 1] as u16   + val[count + 2] as u16  ) / 3  as u16;
//         val[count] = tmp as u8; // red
//         val[count + 1] = tmp as u8; // green
//         val[count + 2] = tmp as u8; // blue
//         count = count + 4;
//         }

//     val
// }


// pub fn fizzbuzz(n: u32) -> () {
//     if 2 > 1 {
//         println!("fizzbuzz");
//     }  else {
//         println!("{}", n);
//     }
// }
#[wasm_bindgen]
     pub fn receive_example_from_js(val: &mut[u8]) -> () {
         panic::set_hook(Box::new(console_error_panic_hook::hook));
        // panic::set_hook(Box::new(console_error_panic_hook::hook));
        let mut count = 0;
            while count < val.len() {
            let tmp  = (val[count] as u16 + val[count + 1] as u16 + val[count + 2] as u16) / 3  as u16;
            val[count] = tmp as u8; // red
            val[count + 1] = tmp as u8; // green
            val[count + 2] = tmp as u8; // blue
            count = count + 4;
            }
        // val
    }

// #[wasm_bindgen]
// pub fn send_example_to_js() -> JsValue {
//     let mut field1 = HashMap::new();
//     field1.insert(0, String::from("ex"));
//     let example = Example {
//         field1,
//         field2: vec![vec![1., 2.], vec![3., 4.]],
//         field3: [1., 2., 3., 4.]
//     };

//     JsValue::from_serde(&example).unwrap()
// }