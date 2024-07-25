<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Product Management</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
<div class="container mt-5">
    <h1>Product Management</h1>
    <form id="productForm">
        <div class="form-group">
            <label for="name">Product Name</label>
            <input type="text" class="form-control" id="name" name="name" required>
        </div>
        <div class="form-group">
            <label for="quantity">Quantity in Stock</label>
            <input type="number" class="form-control" id="quantity" name="quantity" required>
        </div>
        <div class="form-group">
            <label for="price">Price per Item</label>
            <input type="number" step="0.01" class="form-control" id="price" name="price" required>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <hr>
    <h2>Product List</h2>
    <table class="table table-bordered" id="productTable">
        <thead>
            <tr>
                <th>Product Name</th>
                <th>Quantity in Stock</th>
                <th>Price per Item</th>
                <th>Date Time Submitted</th>
                <th>Total Value</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            @foreach($products as $product)
                <tr data-id="{{ $product->id }}">
                    <td>{{ $product->name }}</td>
                    <td>{{ $product->quantity }}</td>
                    <td>{{ $product->price }}</td>
                    <td>{{ $product->created_at }}</td>
                    <td>{{ $product->quantity * $product->price }}</td>
                    <td>
                        <button class="btn btn-sm btn-warning editBtn">Edit</button>
                    </td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <th colspan="4">Total</th>
                <th id="totalValue"></th>
                <th></th>
            </tr>
        </tfoot>
    </table>
</div>
@vite(['resources/js/app.js'])
</body>
</html>
