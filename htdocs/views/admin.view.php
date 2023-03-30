<?php require 'partials/head.php';

$page_title = "An completely normal login page";

?>
<div class="login-container">
    <main>
        <header>
            <h1>Travel Picture Website Login Page</h1>
        </header>

        <form action="<?= $_SERVER['SCRIPT_NAME'] ?>" method="post">
            <br />
            <br />

            <h2><label for="username">Userame:</label>
                <input type="text" id="username" name="username" placeholder="Username" value="<?php echo isset($_POST["username"]) ? $_POST["username"] : ""; ?>">
            </h2>

            <h2> <label for="password">Password:</label>
                <input type="password" id="password" name="password" value="<?php echo isset($_POST["password"]) ? $_POST["password"] : ""; ?>">
            </h2>

            <br />
            <h2> <input type="submit" name="Login" value="Login" /></h2>


        </form>
        <h6>
            <?php if ($_SERVER['REQUEST_METHOD'] === "POST") {
                echo ($error_message);
            } ?>
        </h6>
    </main>
</div>
<?php require 'partials/footer.php'; ?>