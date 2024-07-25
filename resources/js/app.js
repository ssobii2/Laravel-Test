import './bootstrap';

document.addEventListener('DOMContentLoaded', function() {
    updateTotalValue();

    document.getElementById('productForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = new FormData(this);
        let data = {};
        formData.forEach((value, key) => {data[key] = value});
        fetch('/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            let newRow = document.createElement('tr');
            newRow.setAttribute('data-id', data.id);
            newRow.innerHTML = `
                <td>${data.name}</td>
                <td>${data.quantity}</td>
                <td>${data.price}</td>
                <td>${data.created_at}</td>
                <td>${data.quantity * data.price}</td>
                <td>
                    <button class="btn btn-sm btn-warning editBtn">Edit</button>
                </td>
            `;
            document.querySelector('#productTable tbody').prepend(newRow);
            updateTotalValue();
        });
    });

    document.querySelector('#productTable').addEventListener('click', function(e) {
        if (e.target.classList.contains('editBtn')) {
            let row = e.target.closest('tr');
            let id = row.getAttribute('data-id');
            let name = row.children[0].innerText;
            let quantity = row.children[1].innerText;
            let price = row.children[2].innerText;

            document.getElementById('name').value = name;
            document.getElementById('quantity').value = quantity;
            document.getElementById('price').value = price;

            document.getElementById('productForm').onsubmit = function(e) {
                e.preventDefault();
                let formData = new FormData(this);
                let data = {};
                formData.forEach((value, key) => {data[key] = value});
                fetch(`/products/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    row.children[0].innerText = data.name;
                    row.children[1].innerText = data.quantity;
                    row.children[2].innerText = data.price;
                    row.children[4].innerText = data.quantity * data.price;
                    updateTotalValue();
                });
            };
        }
    });

    function updateTotalValue() {
        let totalValue = 0;
        document.querySelectorAll('#productTable tbody tr').forEach(row => {
            let value = parseFloat(row.children[4].innerText);
            totalValue += value;
        });
        document.getElementById('totalValue').innerText = totalValue.toFixed(2);
    }
});
