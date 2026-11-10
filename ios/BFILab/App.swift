import UIKit
import WebKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {}

final class SceneDelegate: UIResponder, UIWindowSceneDelegate {
    var window: UIWindow?

    func scene(
        _ scene: UIScene,
        willConnectTo session: UISceneSession,
        options connectionOptions: UIScene.ConnectionOptions
    ) {
        guard let windowScene = scene as? UIWindowScene else { return }
        let window = UIWindow(windowScene: windowScene)
        window.rootViewController = LabViewController()
        self.window = window
        window.makeKeyAndVisible()
    }
}

final class LabViewController: UIViewController, WKNavigationDelegate {
    private let web = WKWebView()
    private var gameURL: URL? {
        Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "site")
    }

    override func viewDidLoad() {
        super.viewDidLoad()
        view.backgroundColor = UIColor(named: "LabBackground")
        web.isOpaque = false
        web.backgroundColor = .clear
        web.scrollView.backgroundColor = .clear
        web.scrollView.contentInsetAdjustmentBehavior = .never
        web.navigationDelegate = self
        web.translatesAutoresizingMaskIntoConstraints = false
        view.addSubview(web)
        let safe = view.safeAreaLayoutGuide
        NSLayoutConstraint.activate([
            web.leadingAnchor.constraint(equalTo: safe.leadingAnchor),
            web.trailingAnchor.constraint(equalTo: safe.trailingAnchor),
            web.topAnchor.constraint(equalTo: safe.topAnchor),
            web.bottomAnchor.constraint(equalTo: safe.bottomAnchor),
        ])
        loadGame()
    }

    private func loadGame() {
        guard let url = gameURL else {
            showLoadFailure()
            return
        }
        web.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
    }

    private func showLoadFailure() {
        let message = UIAlertController(
            title: "Trace couldn’t open",
            message: "Try reopening BFI Lab or reinstalling it from SideStore.",
            preferredStyle: .alert
        )
        message.addAction(UIAlertAction(title: "OK", style: .default))
        if view.window == nil {
            DispatchQueue.main.async { [weak self] in self?.present(message, animated: true) }
        } else {
            present(message, animated: true)
        }
    }

    func webView(_ webView: WKWebView, didFail navigation: WKNavigation!, withError error: Error) {
        showLoadFailure()
    }

    func webView(
        _ webView: WKWebView,
        didFailProvisionalNavigation navigation: WKNavigation!,
        withError error: Error
    ) {
        showLoadFailure()
    }

    func webViewWebContentProcessDidTerminate(_ webView: WKWebView) {
        loadGame()
    }
}
