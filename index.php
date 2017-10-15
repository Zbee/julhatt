<?php
//Ensure https
if (
  $_SERVER["HTTP_X_FORWARDED_PROTO"]!="https"
  && json_decode($_SERVER["HTTP_CF_VISITOR"])->scheme!="https"
  && !isset($chillS)
) {
  $redirect = "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
  header("HTTP/1.1 301 Moved Permanently");
  header("Location: $redirect");
}

//Include keys and connections
require '../_secret_keys.php';

//Display for a logged in user
if (isset($_COOKIE['xe-name']) && isset($_COOKIE['xe-hash'])) {
  //Collect user data
  $user = strip_tags($_COOKIE['xe-name']);
  $hash = strip_tags($_COOKIE['xe-hash']);

  //Search user data for a user that matches the hash generated to keep user data immutable client-side
  $stmt = $db->query(
    "select * from hxmas where MD5(CONCAT(person, pin))='$hash'"
  );
  //Ensure row count is what is expected
  $rows = $stmt->rowCount();
  //Fail out if user was not found
  if ($rows!=1) {
    $validuser = false;
  } //User is found
  else {
    //User is obviously valid
    $validuser = true;

    //For updating present user is buying for their secret santa target
    if (isset($_POST['target'])) {
      $db->query(
        "UPDATE hxmas SET `g" . $_POST['target']
        . "present`='" . $_POST['present']
        . "', `g" . $_POST['target']
        . "presentimage`='" . $_POST['presentImage']
        . "' WHERE `person`='" . ucfirst($user) . "'"
      );
      //Refresh the page
      echo '<meta http-equiv="refresh" content="1">';
    }

    //Load in user's data
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $image = $row['image']; //This user's image
      $image = strpos($image, "http:") > -1
        ? str_replace("http:", "https:", $image)
        : $image;
      $wishlist = $row['wishlist']; //This user's wishlist

      $gifterOne = $row['gifter1']; //The first target
      $giftOnePresent = $row['g1present']; //This user's present for the first target
      $giftOnePresentImage = $row['g1presentimage']; //Image for the above

      $gifterTwo = $row['gifter2']; //The second target
      $giftTwoPresent = $row['g2present']; //See above
      $giftTwoPresentImage = $row['g2presentimage']; //See above
    }

    //Load first target's basic data
    $stmt = $db->query("SELECT * FROM hxmas WHERE person='$gifterOne'");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $gifterOneImage = $row['image'];
      $gifterOneImage = strpos($gifterOneImage, "http:") > -1
        ? str_replace("http:", "https:", $gifterOneImage)
        : $gifterOneImage;
      $gifterOneWishlist = $row['wishlist'];
      $goa = explode(",", $row['address']);
      $gifterOneAddress = [$goa[0], $goa[1], $goa[2]];
    }
    //Load first target's other secret santa data concerning target
    $stmt = $db->query(
      "SELECT * FROM hxmas WHERE person!='$user' AND gifter1='$gifterOne'"
    );
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $gifterOneOther = $row['person'];
      $gifterOneOtherPresent = $row['g1present'];
      $gifterOneOtherPresentImage = $row['g1presentimage'];
    }
    //Same as above, only I don't know how to do AND+OR in SQL
    if (!isset($gifterOneOther)) {
      $stmt = $db->query(
        "SELECT * FROM hxmas WHERE person!='$user' AND gifter2='$gifterOne'"
      );
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $gifterOneOther = $row['person'];
        $gifterOneOtherPresent = $row['g2present'];
        $gifterOneOtherPresentImage = $row['g2presentimage'];
      }
    }

    //Load second target's basic data
    $stmt = $db->query("SELECT * FROM hxmas WHERE person='$gifterTwo'");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $gifterTwoImage = $row['image'];
      $gifterTwoImage = strpos($gifterTwoImage, "http:") > -1
        ? str_replace("http:", "https:", $gifterTwoImage)
        : $gifterTwoImage;
      $gifterTwoWishlist = $row['wishlist'];
      $goa = explode(",", $row['address']);
      $gifterTwoAddress = [$goa[0], $goa[1], $goa[2]];
    }
    //Load second target's other secret santa data concerning target
    $stmt = $db->query(
      "SELECT * FROM hxmas WHERE person!='$user' AND gifter1='$gifterTwo'"
    );
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      $gifterTwoOther = $row['person'];
      $gifterTwoOtherPresent = $row['g1present'];
      $gifterTwoOtherPresentImage = $row['g1presentimage'];
    }
    //Same as above, only I don't know how to do AND+OR in SQL
    if (!isset($gifterTwoOther)) {
      $stmt = $db->query(
        "SELECT * FROM hxmas WHERE person!='$user' AND gifter2='$gifterTwo'"
      );
      while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $gifterTwoOther = $row['person'];
        $gifterTwoOtherPresent = $row['g2present'];
        $gifterTwoOtherPresentImage = $row['g2presentimage'];
      }
    }
  }
} else {
  $validuser = false;
}

//Display for no user logged in
if (!$validuser) {
  //Select basic data from the database for login
  $stmt = $db->query("SELECT * FROM hxmas");

  $people = '';
  $num = 0;

  //Verify data was received from the database
  if (is_object($stmt)) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
      //User's data
      $name = $row['person'];
      $image = $row['image'];
      $image = strpos($image, "http:") > -1 ? str_replace(
        "http:",
        "https:",
        $image
      ) : $image;
      //List the user
      $people
        .= '
        <a class="col-lg-4 col-md-4 col-sm-6 col-xs-12" data-toggle="modal" data-target="#mod" data-name="'
           . $name
           . '">
          <div class="features-thumb">
            <div class="thumb-header">
              <h3 class="text-center">'
           . $name
           . '</h3>
            </div>

            <div class="thumb-content">
              <div class="margin-top-20 margin-bottom-20">
                <p class="text-center">
                  <img src="'
           . $image
           . '" style="width:55%;" class="img img-circle">
                </p>
              </div>
            </div>
          </div>
        </a>';
      $num += 1;
    }
  }
}
?>

<!DOCTYPE html>

<!--[if lt IE 7]>
<html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>
<html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>
<html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js"> <!--<![endif]-->

<html lang="en">

<head>
  <title>Xmas eHat</title>

  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

  <meta name="description" content="">
  <meta name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>

  <link rel="icon" type="image/png" href="/libs/img/favicon.png">

  <!-- jQuery -->
  <script src="/libs/js/jquery.js"></script>

  <!-- Bootstrap -->
  <link rel="stylesheet" type='text/css' href="/libs/css/bootstrap.css">
  <script src="/libs/js/bootstrap.js"></script>

  <!-- Fontawesome -->
  <link rel="stylesheet"
        type='text/css'
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css">

  <!-- Google Fonts -->
  <link rel='stylesheet'
        type='text/css'
        href='https://fonts.googleapis.com/css?family=Lato:300,400,700'>
  <link rel='stylesheet'
        type='text/css'
        href='https://fonts.googleapis.com/css?family=Varela+Round'>

  <!-- Theme -->
  <link rel="stylesheet" type='text/css' href="/libs/css/main.css">

  <!-- Cookie -->
  <script src="/libs/js/cookie.js"></script>

  <!-- Crypto -->
  <script src="/libs/js/md5.js"></script>

  <!-- Modernizer -->
  <script src="/libs/js/modernizr.js"></script>

  <script src="/libs/js/whatever.js"></script>

  <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!--[if lt IE 9]>
  <script src="https://themes.fractma.com/jekyll/kunstnerisk/js/html5shiv.js"></script>
  <script src="https://themes.fractma.com/jekyll/kunstnerisk/js/respond.min.js"></script>
  <![endif]-->

  <style>
    .modal-content {
      background: white;
      border-radius: 0px;
      -webkit-transition-duration: 0.4s;
      -webkit-transition-property: all;
      -webkit-transition-timing-function: ease;
      border: 1px solid rgb(41, 220, 178);
      box-sizing: border-box;
      border-top-left-radius: 60px;
      border-bottom-right-radius: 60px;
    }

    .modal-header {
      border-top-left-radius: 60px;
      background: #29dcb2;
      text-align: center;
    }

    .modal-header h4 {
      font-family: Lato, sans-serif;
      color: white;
      font-size: 24px !important;
      font-weight: 300;
    }

    a {
      color: #29dcb2;
    }

    html, body {
      max-width: 100%;
      overflow-x: hidden;
    }
  </style>
</head>

<body>
<!--[if lt IE 7]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser.
                       Please <a href="http://browsehappy.com/">upgrade your
                                                                browser</a> to
                       improve your experience.</p>
<![endif]-->

<!-- Main Navigation -->

<!-- End Main Navigation -->

<!-- Main Content -->
<div id="wrap">
  <div id="skrollr-body">

    <!-- Features -->
    <section id="features" class="section-content main-background-color">

      <!--Person Modal-->
      <div class="modal fade"
           id="mod"
           tabindex="-1"
           role="dialog"
           aria-labelledby="myModalLabel"
           aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span
                aria-hidden="true">&times;</span><span class="sr-only">Close</span>
              </button>
              <h4 class="modal-title" id="myModalLabel">Oh yeah? Then what's
                                                        your pin?</h4>
            </div>
            <div class="modal-body">
              <input type="number"
                     id="pin"
                     class="form-control"
                     placeholder="Type. Your. Pin. Here.">
              <input type="hidden" id="name" value="">
              <div id="alert" class="help-block">Just type the pin, if
                                                 JavaScript is enabled you'll be
                                                 logged in
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--End Person Modal-->

      <?php if (!$validuser): ?>
      <div class="container padding-top-50 padding-bottom-50">
        <div class="row">
          <div class="col-lg-12">
            <h1 class="text-center">Who are you?</h1>
            <hr class="margin-bottom-50">

            <!-- Features -->
            <div class="margin-top-30 margin-bottom-30">

              <?=$people?>

            </div>
            <!-- End Features -->
          </div>
        </div>
      </div>

    </section>
    <!-- End Features -->

    <?php else: ?>
    <!-- Pricing Tables -->
    <section id="pricing-tables"
             class="section-content main-background-color">

      <div class="container padding-top-50 padding-bottom-50">
        <div class="row">
          <div class="col-lg-12">

            <h1 class="text-center"><?=ucfirst($user)?>, you're getting
                                                       presents for...</h1>
            <hr class="margin-bottom-50">

            <div class="promos-wrapper clearfix margin-top-100">
              <div class="promo one">
                <h2>Your present</h2>

                <?php if ($giftOnePresent==""): ?>
                <div class="cost-ribbon">
                  <span>None, yet. Right?</span>
                </div>

                <ul class="features">
                  <li>&rarr; Get the gift close to $30 &larr;</li>
                </ul>

                <form action="#" method="post">
                  <input type="hidden" name="target" value="1">
                  <input type="text"
                         name="present"
                         class="form-control margin-top-20"
                         placeholder="URL to your present"
                         style="width:90%">
                  <input type="text"
                         name="presentImage"
                         class="form-control margin-top-20"
                         placeholder="URL of image of your present"
                         style="width:90%">
                  <input type="submit"
                         class="btn btn-default margin-top-20 margin-bottom-20"
                         value="Add their present!">
                </form>
                <?php else: ?>
                <div class="cost-ribbon">
                      <span><a href="<?=$giftOnePresent?>" target="_blank"><img
                        src="<?=$giftOnePresentImage?>"
                        style="width:50%;"
                        class="img img-circle"></a></span>
                </div>

                <ul class="features">
                  <li>I'm so proud of you, you can spend money!</li>
                </ul>
                <?php endif; ?>
              </div>
              <div class="promo three featured">
                <h2><?=ucfirst($gifterOne)?></h2>

                <div class="cost-ribbon">
                    <span><img src="<?=$gifterOneImage?>"
                               style="width:30%;"
                               class="img img-circle"></span>
                </div>

                <ul class="features">
                  <li><?=$gifterOneAddress[0]?>,</li>
                  <li><?=$gifterOneAddress[1]?>,</li>
                  <li><?=$gifterOneAddress[2]?></li>
                  <a href="<?=$gifterOneWishlist?>"
                     target="_blank"
                     class="btn btn-default margin-top-40 margin-bottom-20">View
                                                                            Wishlist</a>
                </ul>
              </div>
              <div class="promo two">
                <h2><?=ucfirst($gifterOneOther)?></h2>
                <p>Is also getting a present for <?=ucfirst($gifterOne)?>.</p>

                <?php if ($gifterOneOtherPresent==""): ?>
                <div class="cost-ribbon">
                  <span>Nothing chosen yet.</span>
                </div>
                <?php else: ?>
                <div class="cost-ribbon">
                      <span><a href="<?=$gifterOneOtherPresent?>"
                               target="_blank"><img src="<?=$gifterOneOtherPresentImage?>"
                                                    style="width:50%;"
                                                    class="img img-circle"></a></span>
                </div>
                <?php endif; ?>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
    <!-- End Pricing Tables -->

    <!-- Pricing Tables -->
    <section id="pricing-tables"
             class="section-content main-background-color">

      <div class="container padding-top-10 padding-bottom-100">
        <div class="row">
          <div class="col-lg-12">

            <div class="promos-wrapper clearfix margin-top-100">
              <div class="promo one">
                <h2>Your present</h2>

                <?php if ($giftTwoPresent==""): ?>
                <div class="cost-ribbon">
                  <span>None, yet. Right?</span>
                </div>

                <ul class="features">
                  <li>&rarr; Get the gift close to $30 &larr;</li>
                </ul>

                <form action="#" method="post">
                  <input type="hidden" name="target" value="2">
                  <input type="text"
                         name="present"
                         class="form-control margin-top-20"
                         placeholder="URL to your present"
                         style="width:90%">
                  <input type="text"
                         name="presentImage"
                         class="form-control margin-top-20"
                         placeholder="URL of image of your present"
                         style="width:90%">
                  <input type="submit"
                         class="btn btn-default margin-top-20 margin-bottom-20"
                         value="Add their present!">
                </form>
                <?php else: ?>
                <div class="cost-ribbon">
                      <span><a href="<?=$giftTwoPresent?>" target="_blank"><img
                        src="<?=$giftTwoPresentImage?>"
                        style="width:50%;"
                        class="img img-circle"></a></span>
                </div>

                <ul class="features">
                  <li>Good job on doing a menial task!</li>
                </ul>
                <?php endif; ?>
              </div>
              <div class="promo three featured">
                <h2><?=ucfirst($gifterTwo)?></h2>

                <div class="cost-ribbon">
                    <span><img src="<?=$gifterTwoImage?>"
                               style="width:30%;"
                               class="img img-circle"></span>
                </div>

                <ul class="features">
                  <li><?=$gifterTwoAddress[0]?>,</li>
                  <li><?=$gifterTwoAddress[1]?>,</li>
                  <li><?=$gifterTwoAddress[2]?></li>
                  <a href="<?=$gifterTwoWishlist?>"
                     target="_blank"
                     class="btn btn-default margin-top-40 margin-bottom-20">View
                                                                            Wishlist</a>
                </ul>
              </div>
              <div class="promo two">
                <h2><?=ucfirst($gifterTwoOther)?></h2>
                <p>Is also getting a present for <?=ucfirst($gifterTwo)?>.</p>

                <?php if ($gifterTwoOtherPresent==""): ?>
                <div class="cost-ribbon">
                  <span>Nothing chosen yet.</span>
                </div>
                <?php else: ?>
                <div class="cost-ribbon">
                      <span><a href="<?=$gifterTwoOtherPresent?>"
                               target="_blank"><img src="<?=$gifterTwoOtherPresentImage?>"
                                                    style="width:50%;"
                                                    class="img img-circle"></a></span>
                </div>
                <?php endif; ?>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
    <!-- End Pricing Tables -->
    <?php endif; ?>

    <div class="row">
      <div class="col-xs-6 col-xs-offset-3 text-center">
        <!--
        <div class="pull-left">
          Made with love and incompetence by <a href='https://keybase.io/zbee'>Ethan</a>
        </div>
        -->
        <?php if ($validuser): ?>
        <a data-toggle="modal" data-target="#wMod" href="#">Update your
                                                            Wishlist</a>
        <div class="pull-right">
          <a href="logout.html">Logout</a>
        </div>
        <?php endif; ?>
      </div>
    </div>

  </div>
</div>

<!--Wishlist Modal-->
<div class="modal fade"
     id="wMod"
     tabindex="-1"
     role="dialog"
     aria-labelledby="myModalLabel"
     aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span
          aria-hidden="true">&times;</span><span class="sr-only">Close</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">Update your Wishlist!</h4>
      </div>
      <div class="modal-body">
        <div id="wAlert"></div>
        Currently: <a href="<?=$wishlist?>"
                      target="_blank"
                      id="wLinkCur"><?=$wishlist?></a><br><br>
        <label for="wlink">New wishlist</label>
        <input type="text"
               id="wLink"
               class="form-control"
               placeholder="Link to your wishlist">
        <span class="help-block">
            Make sure this link works when you're not logged in before submitting it.
          </span>
      </div>
      <div class="modal-footer">
        <a id="subWish" class="btn btn-sm btn-default">Update</a>
      </div>
    </div>
  </div>
</div>
<!--End Wishlist Modal-->

<!-- End Main Content -->

<script>
  $('#mod').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var name = button.data('name')
    var modal = $(this)
    modal.find('.modal-title')
         .text('Oh yeah? Then what\'s your pin, ' + name + '?')
    modal.find('#name').val(name)
    $("#pin").focus()
  })

  $("#pin").keyup(function (e) {
    if ($(this).val().length==4 || $(this).val().length==5) {
      $.ajax({
               type: "POST",
               url: "asker.php",
               data: {name: $('#name').val(), pin: $(this).val()},
               dataType: "json",
               context: document.body,
               async: true,
               complete: function (res, stato) {
                 if (res.responseJSON.status=='good') {
                   var name = Cookies.set(
                     "xe-name",
                     $('#name').val()
                   );

                   var mdf = CryptoJS.MD5($('#name').val() + $('#pin').val());
                   var mdf = mdf.toString(CryptoJS.enc.Hex);
                   var hash = Cookies.set(
                     "xe-hash",
                     mdf
                   );

                   window.location = 'https://x.zbee.me';
                   window.location.reload(true);
                   document.location.reload(true);

                   return true;
                 } else {
                   if (res.responseJSON.status=='incorrect') {
                     $("#alert").html("<span class='code'>Incorrect pin</div>")
                   } else {
                     $("#alert")
                       .html("<span class='code'>Tampering with the form?</div>")
                   }
                 }
               }
             })
    } else {
      if ($(this).val().length==0) {
        $("#alert").html("<span class='code'>Pins are 4 numbers long</div>")
      }
    }
  })

  $("#subWish").click(function () {
    $.ajax({
             type: "POST",
             url: "receiver.php",
             data: {
               hash: "<?=isset($_COOKIE['xe-hash']) ? strip_tags(
                 $_COOKIE['xe-hash']
               ) : ''?>", wLink: $("#wLink").val()
             },
             dataType: "json",
             context: document.body,
             async: true,
             complete: function (res, stato) {
               if (res.responseJSON.status
                   =='good'
                   && res.responseJSON.updated
                      ==true) {
                 $("#wAlert")
                   .html(
                     "<div class='alert alert-success'>Wishlist updated.</div>")
                 $("wLinkCur").text($("#wLink").val()).attr("href", $("#wLink"))
               } else {
                 if (res.responseJSON.status=='bad') {
                   $("#wAlert")
                     .html(
                       "<div class='alert alert-danger'>Wishlist could not be updated.</div>")
                 } else {
                   $("#wAlert")
                     .html(
                       "<div class='alert alert-danger'>Tampering with the form?</div>")
                 }
               }
             }
           })
  })
</script>
</body>

</html>
