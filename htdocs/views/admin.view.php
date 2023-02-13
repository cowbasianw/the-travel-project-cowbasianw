<?php require 'partials/head.php';

$stylesheets = [
    "admin.css"
];

$page_title = "An completely normal login page";

?>
<div class="container">
    <main>
        <header>
            <h1>Login Page</h1>
        </header>

        <form action="<?= $_SERVER['SCRIPT_NAME'] ?>" method="post">
            <ul>
                <li>
                    <label for="username">Userame:</label>

                    <input type="text" id="username" name="username" placeholder="Username" value="<?php echo isset($_POST["username"]) ? $_POST["username"] : ""; ?>">
                </li>
                <br>
                <li>
                    <label for="password">Password:</label>

                    <input type="password" id="password" name="user_pw">
                </li>
                <br>
                <li class="button">
                    <button type="submit">Login</button>
                </li>
            </ul>
        </form>
    </main>
</div>
<?php require 'partials/footer.php'; ?>