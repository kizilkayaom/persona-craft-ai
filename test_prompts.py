from prompts.prompt_templates import get_prompt
from services.generator import call_gemini


def test_prompt(product, audience, output_type, technique):
    print("\n" + "=" * 100)
    print(f"Technique    : {technique}")
    print(f"Product      : {product}")
    print(f"Audience     : {audience}")
    print(f"Output Type  : {output_type}")
    print("=" * 100)

    prompt = get_prompt(
        product=product,
        audience=audience,
        output_type=output_type,
        technique=technique
    )

    print("\nGenerated Prompt:\n")
    print(prompt)

    print("\n" + "-" * 100)
    print("MODEL OUTPUT")
    print("-" * 100)

    response = call_gemini(prompt)

    print(response)
    print("\n")


if __name__ == "__main__":

    tests = [

        # -----------------------------
        # ZERO SHOT
        # -----------------------------
        ("Samsung Galaxy Buds", "Gençler", "Instagram Postu", "zero-shot"),

        ("MacBook Air M4", "Kurumsal", "Website Açıklaması", "zero-shot"),

        ("iPhone 16", "Premium Kullanıcılar", "Reklam Metni", "zero-shot"),

        # -----------------------------
        # FEW SHOT
        # -----------------------------
        ("Stanley Termos", "Aileler", "Reklam Metni", "few-shot"),

        ("Spotify Premium", "Öğrenciler", "E-mail", "few-shot"),

        ("Apple Watch", "Teknoloji Meraklıları", "Website Açıklaması", "few-shot"),

        # -----------------------------
        # CHAIN OF THOUGHT
        # -----------------------------
        ("Nike Air Max", "Premium Kullanıcılar", "Instagram Postu", "chain-of-thought"),

        ("Samsung Galaxy Watch", "Teknoloji Meraklıları", "Website Açıklaması", "chain-of-thought"),

        ("Getir Yemek", "Gençler", "SMS Kampanyası", "chain-of-thought"),
    ]

    for product, audience, output_type, technique in tests:
        test_prompt(
            product=product,
            audience=audience,
            output_type=output_type,
            technique=technique
        )