<?php
/**
 * Customises the WordPress login page.
 *
 * Sets custom logo URL and logo title, as well as logo image and other page styles.
 *
 * @package _s
 */

/**
 * Sets URL of login page logo link.
 *
 * @return string
 */
function my_login_logo_url() {
	return home_url();
}
add_filter( 'login_headerurl', 'my_login_logo_url' );

/**
 * Sets title of login page logo link.
 *
 * @return string
 */
function my_login_logo_url_title() {
	$title = ( get_bloginfo( 'name' ) );
	if ( $title ) {
		return $title;
	}
}
add_filter( 'login_headertitle', 'my_login_logo_url_title' );

/**
 * Adds a logo as a background image along with other page styles.
 *
 * @return mixed
 */
function my_login_logo() {
	?>
	<style type="text/css">

		/* Add page styles. */
		body.login {
		}

		/* Add logo image (remove background colour setting). Check height and width settings. */
		body.login #login h1 a {
			background: #d9d9d9;
			/*background: url(<?php echo esc_url( get_stylesheet_directory_uri() ); ?>/assets/img/logo-login.png) no-repeat scroll center center transparent;*/
			height: 160px;
			width: 320px;
		}

		/* Copy theme button styles; login page styles must be loaded here rather than from theme CSS files. */
		.login input#wp-submit.button.button-primary {
		}
		.login input#wp-submit.button.button-primary:hover {
		}
		.login input#wp-submit.button.button-primary:active {
		}

	</style>
<?php
}
add_action( 'login_enqueue_scripts', 'my_login_logo' );
