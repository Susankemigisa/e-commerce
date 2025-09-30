// const form = document.getElementById("productForm");
// const clearBtn = document.getElementById("clearBtn");
// const productsBody = document.getElementById("productsBody");

// // ✅ Submit with validation + better error handling
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();

//   // --- Simple validation ---
//   let valid = true;
//   [...form.elements].forEach((el) => {
//     if (
//       el.type !== "submit" &&
//       el.type !== "button"
//     ) {
//       const errorMsg = el.parentElement.querySelector(".error-msg");
//       if (!el.value.trim()) {
//         if (errorMsg) errorMsg.style.display = "block";
//         valid = false;
//       } else {
//         if (errorMsg) errorMsg.style.display = "none";
//       }
//     }
//   });

//   if (!valid) {
//     console.warn("⚠️ Validation failed: missing fields");
//     return;
//   }

//   try {
//     const formData = new FormData(form);
//     const res = await fetch("/vendor/addProduct", {
//       method: "POST",
//       body: formData,
//     });

//     // --- Handle network errors ---
//     if (!res.ok) {
//       const text = await res.text();
//       throw new Error(`Server responded with ${res.status}: ${text}`);
//     }

//     const result = await res.json();

//     if (result.success) {
//       alert("✅ Product saved!");
//       form.reset();
//       loadProducts(); // refresh table
//     } else {
//       alert("❌ Error: " + (result.message || "Unknown error"));
//       console.error("Save failed:", result);
//     }
//   } catch (err) {
//     console.error("❌ Fetch error:", err);
//     alert("❌ Failed to save product. Check console for details.");
//   }
// });

// // ✅ Clear form
// clearBtn.addEventListener("click", () => {
//   form.reset();
//   document
//     .querySelectorAll(".error-msg")
//     .forEach((msg) => (msg.style.display = "none"));
// });

// // ✅ Reload products into table
// async function loadProducts() {
//   try {
//     const res = await fetch("/products");


//     if (!res.ok) {
//       throw new Error(`Failed to load products (${res.status})`);
//     }

//     const products = await res.json();
//     productsBody.innerHTML = "";

//     products.forEach((p) => {
//       const row = document.createElement("tr");
//       row.innerHTML = `
//         <td>${p._id}</td>
//         <td>${p.name}</td>
//         <td>${p.category}</td>
//         <td>${p.price.toLocaleString()}</td>
//         <td>${p.quantity}</td>
//       `;
//       productsBody.appendChild(row);
//     });
//   } catch (err) {
//     console.error("❌ Could not load products:", err);
//     productsBody.innerHTML =
//       `<tr><td colspan="5">⚠️ Failed to load products</td></tr>`;
//   }
// }

// // ✅ Initial load
// loadProducts();
