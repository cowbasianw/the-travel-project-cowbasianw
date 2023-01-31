<?php require 'partials/head.php'; ?>

<form action="<?= $_SERVER['SCRIPT_NAME'] ?>" method="post">
    <ul>
        <li>
            <label for="username">Userame:</label>

            <input type="text" id="username" name="username" placeholder="Username" value="<?php echo isset($_POST["username"]) ? $_POST["username"] : ""; ?>">
        </li>
        <li>
            <label for="password">Password:</label>

            <input type="password" id="password" name="user_pw">
        </li>

        <li class="button">
            <button type="submit">Login</button>
        </li>
    </ul>
</form>

<?php require 'partials/footer.php'; ?>