"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/common/PageTransition";
import type { BlogPost } from "@/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
        const data = await res.json();
        setPosts(data);
      } catch {
        console.error("Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <p className="text-xs font-mono text-foreground/30 uppercase tracking-widest mb-4">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Thoughts &amp; Writings
        </h1>
        <p className="text-foreground/50 mb-12">
          I write about web development, productivity, and lessons learned building products.
        </p>

        {loading ? (
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 rounded-2xl bg-muted/30 animate-pulse"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">✍️</p>
            <p className="text-foreground/40 text-sm">
              No posts yet. Check back soon!
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post, i) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex items-start justify-between gap-4 p-6 rounded-2xl border border-border bg-card/30 hover:border-foreground/20 hover:bg-card/60 transition-all group"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-0.5 rounded-md bg-muted text-foreground/50"
                        >
                          {tag}
                        </span>
                      ))}
                      <span className="flex items-center gap-1 text-xs text-foreground/30">
                        <Clock size={11} />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h2 className="font-semibold text-foreground mb-1 group-hover:text-foreground transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-foreground/50 line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-foreground/20 group-hover:text-foreground/60 group-hover:translate-x-1 transition-all shrink-0 mt-1"
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}